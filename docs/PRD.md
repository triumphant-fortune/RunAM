# Product Requirements — RunAm Hedera Receipt NFTs

## Goal
Issue immutable, low-cost on-chain receipts for every booking and delivery using Hedera Token Service (HTS) NFTs on **testnet**. Surface HashScan links to users in real time.

## Users
- **Sender**: Books a delivery and wants proof of escrow/payment.
- **Traveler**: Delivers a package and wants portable reputation proof.
- **Support/Admin**: Needs auditable evidence for disputes.

## Use Cases
- As a sender, when I confirm a booking I get a HashScan link proving my payment and route.
- As a traveler, when I mark a booking delivered I get a second HashScan link proving completion.
- As a support agent, I can cross-check booking IDs against both NFTs for dispute resolution.

## Scope (Hackathon)
- One HTS collection creation: `RunAm Delivery Receipt` (symbol `RAM`).
- Mint **Booking Receipt** NFT immediately after “Confirm & Book”.
- Mint **Delivery Receipt** NFT immediately after “Mark as Delivered”.
- Store Token ID in env; no smart contracts.
- Show both HashScan URLs in UI (modal/toast and dashboard history).

## Functional Requirements
- `createReceiptCollection()` runs once at startup/setup and returns Token ID.
- `mintBookingReceipt(bookingId, senderId, route, usdcAmount)`:
  - Metadata JSON includes `type=BOOKING`, `status=PENDING`, timestamp, IDs, route, amount.
  - Returns HashScan URL (`https://hashscan.io/testnet/token/<TOKEN_ID>/<serial>`).
- `mintDeliveryReceipt(bookingId, travelerId)`:
  - Metadata JSON includes `type=DELIVERY`, `status=COMPLETE`, timestamp, IDs.
  - Returns HashScan URL.
- Frontend integration:
  - Sender flow: after “Confirm & Book”, show modal with booking receipt link.
  - Traveler flow: after “Mark as Delivered”, show modal with delivery receipt link.
  - Dashboard lists both links per booking.

## Non-Functional Requirements
- Latency: Show receipt link or error within 5 seconds of action.
- Cost: Free on testnet; mainnet target ~$0.001 per mint.
- Reliability: Retry mint with exponential backoff up to 3 times on transient errors.
- Security: Keys only in env; no logging of secrets; no PII on-chain.

## Acceptance Criteria
- Token collection created once and Token ID persisted in env.
- Booking action triggers mint and displays valid HashScan link.
- Delivery action triggers mint and displays valid HashScan link.
- Metadata contains correct bookingId and status values for both NFTs.
- UI shows error state with retry guidance if mint fails.

## Dependencies
- `@hashgraph/sdk` installed and configured for Hedera **testnet**.
- Backend module `src/hedera/hedera-mint.js` exposes all three functions.
- Env vars: `HEDERA_ACCOUNT_ID`, `HEDERA_PRIVATE_KEY`, `RUNAM_RECEIPT_TOKEN_ID`.

## Out of Scope (Hackathon)
- Smart contract escrow.
- Mainnet deployment and fee management.
- Multi-language or offline support for HashScan links.
