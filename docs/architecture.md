# Architecture — RunAm Hedera Receipts

## Overview
- **Frontend (React/Vite)**: Sender and Traveler dashboards, plus Support/Admin view (read-only) consuming REST APIs. Uses React Query for data fetching and the NFT receipt modal for HashScan links.
- **Backend (Express/TypeScript)**: REST API under `/api`, orchestrates Hedera HTS minting, enforces business rules, and persists bookings/receipts.
- **Hedera HTS**: Native NFT collection (`RunAm Delivery Receipt`, symbol `RAM`) on **testnet**. Stores booking and delivery receipt metadata.
- **Database (Postgres/Drizzle)**: Stores users, roles (sender/traveler/support/admin), bookings, and receipt references (Token ID + serial + HashScan URL + txId).
- **Storage Adapter**: Abstraction in `server/storage.ts` to swap mem/storage/DB without changing routes.

## Key Modules
- `src/hedera/hedera-mint.js` — SDK client + functions:
  - `createReceiptCollection()` → one-time setup returning Token ID (persist to env).
  - `mintBookingReceipt({ bookingId, senderId, route, usdcAmount })` → returns HashScan URL + serial/txId.
  - `mintDeliveryReceipt({ bookingId, travelerId })` → returns HashScan URL + serial/txId.
- `server/routes.ts` — API endpoints:
  - `POST /api/hedera/create-collection` (setup only, gated/admin).
  - `POST /api/bookings/:id/mint-booking` → validates booking ownership/status, idempotent.
  - `POST /api/bookings/:id/mint-delivery` → validates traveler ownership/status, idempotent.
  - `GET /api/bookings` → filter by user role; support/admin can search and audit.
- `client/src/pages/SenderDashboard.tsx` — booking flow; calls booking mint and shows receipt modal.
- `client/src/pages/TravelerDashboard.tsx` — delivery flow; calls delivery mint and shows receipt modal.
- `client/src/pages/SupportAdmin.tsx` (to add) — table/search of bookings with both receipt links and flags.

## Data Model (minimal)
- `User { id, username, role: 'sender' | 'traveler' | 'support' | 'admin' }`
- `Booking { id, senderId, travelerId?, route, usdcAmount, status, createdAt }`
- `Receipt { id, bookingId, type: 'BOOKING' | 'DELIVERY', status, tokenId, serial, hashscanUrl, txId, mintedAt }`

## Flows
- **Collection Setup**: Admin/support runs `createReceiptCollection()` once → stores Token ID in env (`RUNAM_RECEIPT_TOKEN_ID`).
- **Booking Flow (Sender)**:
  1) Sender confirms booking in UI.
  2) Backend validates booking + status, calls `mintBookingReceipt`.
  3) Store receipt (tokenId, serial, hashscanUrl, txId) + booking status.
  4) Return HashScan URL → UI shows modal and stores link in dashboard.
- **Delivery Flow (Traveler)**:
  1) Traveler marks delivered.
  2) Backend validates booking + traveler match + status, calls `mintDeliveryReceipt`.
  3) Store receipt, update booking to `COMPLETE`.
  4) Return HashScan URL → UI shows modal and dashboard shows both links.
- **Support/Admin Flow**:
  1) Support/admin loads bookings table.
  2) Filters by bookingId/user/status, sees both receipt links, txIds, and any invalid flags.
  3) Uses HashScan links for dispute verification.

## Security & Ops Highlights
- Env vars: `HEDERA_ACCOUNT_ID`, `HEDERA_PRIVATE_KEY`, `RUNAM_RECEIPT_TOKEN_ID`.
- Server-side metadata composition; no PII on-chain.
- Idempotency on booking/delivery mints; audit logs for support/admin actions.
- Retry/backoff for Hedera throttling; log txIds for support.

## User Flows (UI)
- Sender: Land → connect wallet (or mock) → fill parcel → select traveler → confirm booking → modal with booking HashScan link → dashboard shows receipt link.
- Traveler: Land → connect → publish trip → accept parcel → mark delivered → modal with delivery HashScan link → dashboard shows both links.
- Support/Admin: Login → bookings table → search/filter → open booking details → click HashScan links to verify booking/delivery receipts → note disputes.
