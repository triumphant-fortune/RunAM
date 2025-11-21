# Task List — Hedera Receipt NFTs

## Backend / Hedera
- [ ] Add `src/hedera/hedera-mint.js` implementing:
  - [ ] `createReceiptCollection()` — create `RunAm Delivery Receipt` (symbol `RAM`) on testnet and return Token ID.
  - [ ] `mintBookingReceipt({ bookingId, senderId, route, usdcAmount })` — metadata `type=BOOKING`, `status=PENDING`.
  - [ ] `mintDeliveryReceipt({ bookingId, travelerId })` — metadata `type=DELIVERY`, `status=COMPLETE`.
- [ ] Add env handling for `HEDERA_ACCOUNT_ID`, `HEDERA_PRIVATE_KEY`, `RUNAM_RECEIPT_TOKEN_ID`.
- [ ] Implement retry/backoff for mint transactions and return HashScan URLs.

## Frontend Integration
- [ ] Sender flow: after "Confirm & Book", call booking mint; show modal with HashScan link.
- [ ] Traveler flow: after "Mark as Delivered", call delivery mint; show modal with HashScan link.
- [ ] Dashboard: persist and render both HashScan links per booking.
- [ ] Error handling: surface retry guidance if mint fails in UI.
- [ ] Support/Admin view: searchable list of bookings with both NFT links and statuses for dispute resolution.
- [ ] Notification hooks to alert support/admin on mint failures or duplicate attempts.

## Operations
- [ ] Run one-time collection creation and store Token ID in env per environment.
- [ ] Add monitoring/logging for mint transaction IDs and latency.
- [ ] Document runbook updates in `docs/DEBUG.md` (done).
- [ ] Access controls/roles for support/admin endpoints and UI (view-only + audit logs).

## QA
- [ ] Smoke-test minting against Hedera testnet with sample booking/delivery IDs.
- [ ] Verify metadata fields appear in HashScan JSON view.
- [ ] Confirm UI shows correct links for historical bookings.
- [ ] Verify support/admin dashboard can retrieve and filter bookings with both receipts and flags invalid mints.
