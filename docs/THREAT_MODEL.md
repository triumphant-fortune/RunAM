# Threat Model — Hedera HTS Receipt Minting

## Assets to Protect
- Hedera testnet account ID and private key used for token creation/minting.
- Receipt collection Token ID (`RunAm Delivery Receipt` / symbol `RAM`).
- Integrity of NFT metadata linking bookings and deliveries.
- User identifiers (senderId, travelerId) and booking IDs stored in app DB.

## Trust Boundaries
- Frontend → backend/API that invokes `src/hedera/hedera-mint.js`.
- Backend → Hedera testnet (public nodes).
- Storage of credentials in environment variables/secrets store.

## Key Threats & Mitigations
- **Key exposure**: Private key leaked via logs or misconfigured env.
  - Mitigate with env vars, never log keys, and mount secrets per environment.
- **Unauthorized minting**: Attacker calls mint endpoints directly.
  - Mitigate with auth on booking/delivery APIs, server-side validation of user/booking ownership, and rate limiting.
- **Metadata forgery/tampering**: Incorrect booking/traveler IDs minted.
  - Mitigate with server-side composition of metadata; never trust client payloads directly. Include `bookingId` and `type` fields for verification.
- **Replay/duplicate mints**: Same booking minted multiple times.
  - Mitigate with idempotency keys per booking/delivery transition and DB flags before minting.
- **DoS on mint path**: Excessive requests throttle Hedera client.
  - Mitigate with API rate limits/backoff and queueing if needed.
- **PII leakage on-chain**: Permanent public data.
  - Mitigate by storing only opaque IDs/routes/amounts; no names, phone numbers, or addresses in metadata.
- **HashScan link spoofing**: UI shows wrong Token ID/serial.
  - Mitigate by deriving HashScan URL server-side from known Token ID and returned serial number.

## Assumptions
- Running solely on Hedera testnet for the hackathon; mainnet migration will require key rotation and fee budgeting.
- Backend has authenticated context for sender/traveler actions before minting is invoked.

## Residual Risks
- If the minting key is compromised, an attacker can create junk receipts until rotated.
- Hedera network/service disruptions will block receipt issuance; UI must show retries/failures gracefully.
