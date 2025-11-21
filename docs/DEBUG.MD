# Debug Playbook — Hedera Receipt Minting

## Quick Checks
- Node 18+ confirmed: `node -v`.
- SDK installed: `npm ls @hashgraph/sdk` (install if missing).
- Env vars set: `HEDERA_ACCOUNT_ID`, `HEDERA_PRIVATE_KEY`, `RUNAM_RECEIPT_TOKEN_ID` (Token ID only after collection is created).
- Network: using **testnet**; ensure no mainnet endpoints in config.

## Common Issues
- **`INVALID_SIGNATURE`**: Private key/env mismatch. Re-export keys and restart process.
- **`TRANSACTION_REQUIRES_ZERO_TOKEN_BALANCE`** on create: Trying to recreate token; reuse existing Token ID.
- **Timeouts / `BUSY`**: Hedera node throttling. Retry with backoff (up to 3 attempts).
- **HashScan shows “Token not found”**: Wrong network (mainnet/testnet mix) or wrong Token ID.
- **Metadata missing fields**: Ensure server, not client, assembles metadata object before minting.

## Repro & Smoke Tests
1. **Create collection once** (only if Token ID not set):
   ```bash
   node --input-type=module -e "import('./src/hedera/hedera-mint.js').then(m=>m.createReceiptCollection()).then(console.log).catch(console.error)"
   ```
   - Expect output: `0.0.xxxxxxx` Token ID. Store in env.
2. **Mint booking receipt**:
   ```bash
   node --input-type=module -e "import('./src/hedera/hedera-mint.js').then(m=>m.mintBookingReceipt({bookingId:'bk-123', senderId:'u-1', route:'Uyo → Lagos', usdcAmount:'5.20'})).then(console.log).catch(console.error)"
   ```
   - Expect HashScan URL with serial number.
3. **Mint delivery receipt**:
   ```bash
   node --input-type=module -e "import('./src/hedera/hedera-mint.js').then(m=>m.mintDeliveryReceipt({bookingId:'bk-123', travelerId:'u-9'})).then(console.log).catch(console.error)"
   ```
   - Expect second HashScan URL with new serial.

## Logging Guidance
- Log request IDs, bookingId, travelerId, and Token ID.
- Do **not** log private keys or raw Hedera transaction bytes.
- Capture Hedera transaction IDs for support follow-up.

## Rollback / Safety
- If bad metadata is minted, cannot delete NFT on-chain. Mark receipt as invalid in app DB and remint with correct data.
- Rotate keys if exposure suspected; update env and redeploy.
