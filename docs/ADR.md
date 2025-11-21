# ADR 001: Hedera HTS Receipts for Bookings and Deliveries

## Status
Accepted — Hedera Hello Future hackathon scope

## Context
- RunAm needs provable, low-cost receipts for every booking and delivery.
- Hedera Token Service (HTS) offers native NFTs with ~3s finality and ~$0.001 fees on mainnet; testnet is free.
- We want to avoid smart contracts to reduce complexity and approval overhead during the hackathon.

## Decision
Use Hedera HTS NFTs to represent two immutable receipts per delivery:
- **Receipt Collection**: One master NFT collection named `RunAm Delivery Receipt` with symbol `RAM`.
- **Booking Receipt NFT**: Minted at booking confirmation with metadata `{type: "BOOKING", status: "PENDING", ...}`.
- **Delivery Receipt NFT**: Minted at delivery confirmation with metadata `{type: "DELIVERY", status: "COMPLETE", ...}`.

All functions live in `src/hedera/hedera-mint.js` and run against **Hedera testnet**. The Token ID from the master collection is stored in environment variables for re-use.

## Decision Drivers
- Sub-¢ minting cost enables receipts for very small parcel values.
- 3-second finality supports real-time UI feedback.
- HashScan explorers provide human-shareable proof links.
- Minimal infra: no new backend services or smart contracts needed.

## Alternatives Considered
- **Smart contract escrow + receipts**: Higher complexity and audit surface; slower to iterate during hackathon.
- **Off-chain proofs (DB + signatures)**: Cheap but not trustless; breaks “view on-chain” requirement.
- **EVM L2 NFTs**: Adds bridging and wallet complexity for Nigerian users; Hedera already meets perf/cost targets.

## Consequences
- Must manage Hedera account ID and private key securely (env vars/secrets).
- Token ID is a hard prerequisite for minting; bootstrap once at startup/setup.
- Frontend must surface two HashScan URLs per delivery and store references alongside booking data.
- Future mainnet launch requires fee budgeting but no code redesign.

## Implementation Notes
- Install SDK: `npm install @hashgraph/sdk`.
- Functions:
  - `createReceiptCollection()` → returns Token ID (run once).
  - `mintBookingReceipt({ bookingId, senderId, route, usdcAmount })` → returns HashScan URL.
  - `mintDeliveryReceipt({ bookingId, travelerId })` → returns HashScan URL.
- HashScan URL format: `https://hashscan.io/testnet/token/<TOKEN_ID>/<serial>`.

## Verification
- On booking and delivery actions, UI should show modal/toast with clickable HashScan link.
- Compare stored booking ID with NFT metadata to ensure correct linkage.
- Monitor Hedera testnet responses for throttling or node errors; retry with backoff.
