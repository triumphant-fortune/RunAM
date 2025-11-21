import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

export type UserRole = "sender" | "traveler" | "support" | "admin";

export interface Booking {
  id: string;
  senderId: string;
  travelerId?: string;
  route?: string;
  usdcAmount?: number;
  status: "PENDING" | "COMPLETE";
  createdAt: string;
}

export interface Receipt {
  id: string;
  bookingId: string;
  type: "BOOKING" | "DELIVERY";
  status: "PENDING" | "COMPLETE";
  tokenId: string;
  serial: number;
  hashscanUrl: string;
  transactionId: string;
  mintedAt: string;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  upsertBooking(booking: Booking): Promise<Booking>;
  getBooking(id: string): Promise<Booking | undefined>;
  listBookings(): Promise<Booking[]>;

  getReceipt(bookingId: string, type: Receipt["type"]): Promise<Receipt | undefined>;
  saveReceipt(receipt: Receipt): Promise<Receipt>;
  listReceipts(): Promise<Receipt[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private bookings: Map<string, Booking>;
  private receipts: Map<string, Receipt>;

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
    this.receipts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async upsertBooking(booking: Booking): Promise<Booking> {
    this.bookings.set(booking.id, booking);
    return booking;
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async listBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values()).sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt),
    );
  }

  async getReceipt(bookingId: string, type: Receipt["type"]): Promise<Receipt | undefined> {
    return Array.from(this.receipts.values()).find(
      (r) => r.bookingId === bookingId && r.type === type,
    );
  }

  async saveReceipt(receipt: Receipt): Promise<Receipt> {
    this.receipts.set(receipt.id, receipt);
    return receipt;
  }

  async listReceipts(): Promise<Receipt[]> {
    return Array.from(this.receipts.values());
  }
}

export const storage = new MemStorage();
