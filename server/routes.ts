import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage, type Booking, type Receipt } from "./storage";
import {
  createReceiptCollection,
  mintBookingReceipt,
  mintDeliveryReceipt,
} from "../src/hedera/hedera-mint.js";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post(
    "/api/hedera/create-collection",
    async (_req: Request, res: Response, next) => {
      try {
        const tokenId = await createReceiptCollection();
        res.json({ tokenId });
      } catch (err) {
        next(err);
      }
    },
  );

  app.post(
    "/api/bookings/:id/mint-booking",
    async (req: Request, res: Response, next) => {
      try {
        const bookingId = req.params.id;
        const { senderId, route, usdcAmount } = req.body ?? {};
        if (!bookingId || !senderId || !route || usdcAmount === undefined) {
          res.status(400).json({ message: "Missing booking mint fields" });
          return;
        }

        // idempotency: return stored receipt if already minted
        const existing = await storage.getReceipt(bookingId, "BOOKING");
        if (existing) {
          res.json(existing);
          return;
        }

        // upsert booking stub (replace with real persistence later)
        const booking: Booking = {
          id: bookingId,
          senderId,
          route,
          usdcAmount: Number(usdcAmount),
          status: "PENDING",
          createdAt: new Date().toISOString(),
        };
        await storage.upsertBooking(booking);

        const result = await mintBookingReceipt({
          bookingId,
          senderId,
          route,
          usdcAmount,
        });

        const receipt: Receipt = {
          id: `${bookingId}-BOOKING`,
          bookingId,
          type: "BOOKING",
          status: "PENDING",
          tokenId: result.tokenId,
          serial: result.serial,
          hashscanUrl: result.hashscanUrl,
          transactionId: result.transactionId,
          mintedAt: new Date().toISOString(),
        };
        await storage.saveReceipt(receipt);
        res.json(receipt);
      } catch (err) {
        next(err);
      }
    },
  );

  app.post(
    "/api/bookings/:id/mint-delivery",
    async (req: Request, res: Response, next) => {
      try {
        const bookingId = req.params.id;
        const { travelerId } = req.body ?? {};
        if (!bookingId || !travelerId) {
          res.status(400).json({ message: "Missing delivery mint fields" });
          return;
        }

        const existing = await storage.getReceipt(bookingId, "DELIVERY");
        if (existing) {
          res.json(existing);
          return;
        }

        const existingBooking = await storage.getBooking(bookingId);
        if (!existingBooking) {
          await storage.upsertBooking({
            id: bookingId,
            senderId: "unknown",
            travelerId,
            status: "PENDING",
            createdAt: new Date().toISOString(),
          });
        } else {
          await storage.upsertBooking({
            ...existingBooking,
            travelerId,
            status: "COMPLETE",
          });
        }

        const result = await mintDeliveryReceipt({
          bookingId,
          travelerId,
        });

        const receipt: Receipt = {
          id: `${bookingId}-DELIVERY`,
          bookingId,
          type: "DELIVERY",
          status: "COMPLETE",
          tokenId: result.tokenId,
          serial: result.serial,
          hashscanUrl: result.hashscanUrl,
          transactionId: result.transactionId,
          mintedAt: new Date().toISOString(),
        };
        await storage.saveReceipt(receipt);
        res.json(receipt);
      } catch (err) {
        next(err);
      }
    },
  );

  app.get("/api/bookings", async (_req: Request, res: Response, next) => {
    try {
      const bookings = await storage.listBookings();
      const receipts = await storage.listReceipts();
      const receiptMap = receipts.reduce<Record<string, Receipt[]>>((acc, r) => {
        acc[r.bookingId] = acc[r.bookingId] || [];
        acc[r.bookingId].push(r);
        return acc;
      }, {});
      res.json(
        bookings.map((b) => ({
          ...b,
          receipts: receiptMap[b.id] || [],
        })),
      );
    } catch (err) {
      next(err);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
