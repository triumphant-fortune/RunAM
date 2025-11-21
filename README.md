# RunAm

![RunAm logo](./docs/logo.png)

Tokenized Trust for Africa's Logistics — built for Hedera Hello Future (Ascension)

![License](https://img.shields.io/badge/license-MIT-blue.svg )
![Built with](https://img.shields.io/badge/built%20with-React%20%7C%20Vite%20%7C%20Hedera%20JS%20SDK-brightgreen )
![Hackathon](https://img.shields.io/badge/built%20for-Hedera%20Hello%20Future%3A%20Ascension-orange )

The first **micro-transaction trust protocol**—a logistics marketplace that IS a reputation primitive AND generates on-chain proof for every delivery.

## Table of Contents

- [About](#about)
- [Why Hedera](#why-hedera)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [How It Works](#how-it-works)
- [MVP (Delivered)](#mvp-delivered)
- [Real-World Impact](#real-world-impact)
- [Who Benefits](#who-benefits)
- [Technical Deep Dive](#technical-deep-dive)
- [Validation](#validation)
- [Roadmap & GTM](#roadmap--gtm)
- [FAQ for Judges](#faq-for-judges)
- [Getting Started](#getting-started)
  

## About

RunAm is a peer-to-peer parcel delivery marketplace built for the [Hedera Hello Future Hackathon](https://hellofuturehackathon.dev) that solves Nigeria's biggest logistics challenge: **the waiting game in informal networks**.

Instead of forcing users to wait 3-7 days for a cousin's travel schedule OR pay DHL ₦40,000 they can't afford, RunAm **tokenizes trust on Hedera**—minting $0.001 NFT receipts for every booking and delivery. This creates **immutable proof**, **portable reputation**, and **continuous trust verification**—all while maintaining 1:1 payment safety.

**The "Uber for Parcels" for Africa's $3B Informal Economy**  
**Web2 Matching + Web3 Trust = RunAm**

## Why Hedera
- **HTS native NFTs, no contracts**: Dual receipts (booking + delivery) minted for ~$0.001 on mainnet; free on testnet. Compact metadata fits HTS limits.
- **Speed for UX**: ~3s finality lets us show HashScan links in real time inside the booking/delivery modals.
- **HashScan for trust**: Shareable, human-readable proof links per delivery (2 NFTs per booking).
- **Cost/scale story**: At 100K monthly deliveries, +0.04 TPS on Hedera with negligible fees — viable for ₦2,000 parcels.
- **Why not Web2?** Web2 receipts can be forged; WhatsApp screenshots don’t settle disputes. On-chain receipts create portable reputation and auditability for support/admin.

## The Problem

### **The Waiting Game: Time Mismatch Kills Velocity**

| Traditional Approach | The Hidden Hassle |
|---------------------|-------------------|
| **Hoard & Pray** | Use family/friends, but **wait 3-7 days** for their travel schedule. Urgent package? Too bad. |
| **Wait & Courier** | Pay DHL ₦40,000, wait 1-2 days, but 95% can't afford it. Package worth ₦5,000? Not worth it. |

**Trust is table stakes. Speed is the game-changer.**

**Both approaches fail because of time mismatch.** Users don't just need trust—they need **just-in-time logistics**. Your package shouldn't wait for your cousin—it should ship with whoever is **leaving in the next 4 hours**.

---

## The Solution

### **Instant Trust, Instant Shipping**

RunAm eliminates the "waiting game" by creating a **real-time marketplace** of **50,000+ daily travelers**. Every booking mints an NFT receipt in 3 seconds. Travelers see proof **before they pack their trunk**.

**Hedera makes this viable:**
- **3-second finality** = Traveler confirms booking in real-time
- **$0.001 fee** = You can book a ₦2,000 delivery and still profit
- **NFT receipt** = No "I'll send it when I leave" excuses

---

## How It Works

### **The Dual-NFT Architecture**

RunAm is built on Hedera's **Token Service (HTS)** to create two independent trust streams from the same delivery.

1. **Sender Books Delivery** → Deposits USDC in escrow
2. **Mint Booking NFT** → Immutable proof of pending delivery
3. **Traveler Delivers** → Confirms drop-off
4. **Mint Delivery NFT** → Immutable proof of completion
5. **USDC Released** → Auto-settlement via HTS

### **The "Winning Twist" - NFT Separation**

Same delivery. Two NFTs. Two purposes.

**Primary NFT: Booking Receipt** → **Trust Establishment**  
- Metadata: `{type: "BOOKING", status: "PENDING", route, amount}`
- Use case: Proof of escrow, dispute evidence
- Cost: $0.001 on Hedera

**Secondary NFT: Delivery Receipt** → **Reputation Building**  
- Metadata: `{type: "DELIVERY", status: "COMPLETE", travelerId}`
- Use case: Traveler reputation, portable across dApps
- Cost: $0.001 on Hedera

---

## MVP (Delivered)
- HTS collection: `RunAm Delivery Receipt` (symbol `RAM`) deployed on testnet.
- Booking receipts: `mintBookingReceipt` called after “Confirm & Book”; UI modal shows live HashScan link.
- Delivery receipts: `mintDeliveryReceipt` called after “Mark as Delivered”; UI modal shows live HashScan link.
- APIs: `/api/hedera/create-collection`, `/api/bookings/:id/mint-booking`, `/api/bookings/:id/mint-delivery`, `/api/bookings` (audit).
- Support/Admin view: `/support` lists bookings with both receipts and HashScan links.
- Resilience: Byte-safe metadata, retry/backoff, idempotent mint endpoints.

---

## Real-World Impact

### **Trust Metrics: 1,000 Deliveries/Month**

| Metric | Monthly Value | Recipient |
|--------|---------------|-----------|
| Hedera NFTs Minted | 2,000 txs | Hedera Network |
| USDC Escrow Volume | ~ $5,000 | Travelers |
| Trust Proofs Created | 2,000 receipts | Senders & Travelers |
| Platform Commission | $750 (15%) | RunAm Treasury |

### **Scalability**

| MAU | Monthly NFTs | Hedera TPS Impact | Annual Revenue |
|-----|--------------|-------------------|----------------|
| 500 | 1,000 | +0.0004 TPS | $4,500 |
| 5,000 | 10,000 | +0.004 TPS | $45,000 |
| 50,000 | 100,000 | +0.04 TPS | $450,000 |

---

## Who Benefits

### **For Senders**
- **60% cheaper** than DHL
- **Fast**: Book in 60 seconds, not 3 days
- **Trustless**: Don't need to know the traveler
- **Verifiable**: NFT receipt = legal proof

### **For Travelers**
- **Extra income**: $15-30 per trip
- **Reputation NFT**: Portable across platforms
- **No risk**: USDC escrow guarantees payment

### **For Hedera Ecosystem**
- **New use case**: HTS for social coordination
- **Real TPS**: 2 NFTs per delivery = on-chain activity
- **Market expansion**: Nigerian 17-50 age bracket exposed to Hedera

---

## Technical Deep Dive

### **Core Components**
- **Hedera HTS**: Native NFT minting
- **USDC-HTS**: Escrow payments
- **HashScan**: Public proof explorer

### **Key Functions**
- `mintBookingReceipt()` - Called per booking
- `mintDeliveryReceipt()` - Called per delivery

---

## Validation

### **Initial User Research: 13 Nigerian Inter-City Travelers**
Conducted via WhatsApp & Telegram groups:

**Key Findings:**
- **85%** ghosting rate in informal arrangements
- **92%** would use a trustless alternative
- **Top request**: "Receipt I can verify instantly"

**Sample Quote**:  
*"I waited 5 days for my cousin to travel, then he ghosted. I'd pay ₦5 for a guaranteed receipt."* — Uyo respondent

**Limitation**: Small sample size (n=13). Next step: 100-user pilot.

### Feedback Loops
- WhatsApp/Telegram traveler groups for rapid feedback on booking/delivery UX.
- In-app toasts/modals capture failure states; support/admin audit view for dispute triage.
- Planned pilot: 100 users in Akwa Ibom; measure conversion, mint success rate, disputes resolved via receipts.

---

## Roadmap & GTM

**0-30 days (Hackathon)**  
- ✅ Testnet HTS receipts (booking + delivery), HashScan links in UI, support/admin audit view.

**30-60 days (Pilot)**  
- 100-user pilot in Akwa Ibom; integrate DB persistence; add auth/roles; harden idempotency.  
- Collect metrics: booking->delivery conversion, mint success rate, dispute resolution time.

**60-90 days (Scale-ready)**  
- Mainnet readiness (fee budgeting), traveler KYC, USDC-HTS escrow.  
- GTM: Superteam NG community, campus/airport travel groups, local micro-influencers.

**Hedera Impact Targets**  
- Every delivery mints 2 NFTs: +0.04 TPS at 100K monthly deliveries.  
- Drives Hedera account creation (sender + traveler) and repeat on-chain actions.

---

## FAQ for Judges
- **Why NFTs, not DB receipts?** On-chain receipts are tamper-proof, portable, and instantly verifiable via HashScan; screenshots in WhatsApp are not.
- **Why Hedera over Web2/EVM?** Sub-cent fees and 3s finality make micro-logistics viable; no contract deployment needed for receipts.
- **Does this exist cross-chain?** Similar “proof” exists elsewhere, but dual-HTS receipts for logistics with sub-cent cost is new territory on Hedera.
- **What’s on-chain vs off-chain?** Only opaque IDs/route/amount and status go on-chain (no PII). Bookings, users, and disputes stay off-chain; support/admin uses on-chain receipts for evidence.
- **How do users see receipts?** HashScan links in booking/delivery modals and dashboards; support/admin audit table lists both receipts per booking.

### **Early Adopters: Superteam NG**
- **500+ crypto-native Nigerians** in community
- **Opportunity**: Convert Solana maxis by showing Hedera's micro-fee advantage
- **Distribution**: Content writer network for GTM

---

## Future Roadmap

**Phase 1 (Hackathon - DONE)** ✅  
- NFT receipts via Hedera HTS

**Phase 2 (Late Jan 2026)**
- **Pilot Launch**: 50 users in Akwa Ibom
- **Integrate**: USDC-HTS escrow, NIN API
- **Target**: 100 deliveries/week

**Phase 3 (Q2 2026)**
- Expand to Calabar, PH, Ebonyi
- 1,000 MAU target

**Phase 4 (Q3 2026)**
- 10K MAU
- Hedera mainnet launch

---

## Getting Started

### Prerequisites
- Node.js 18+
- Hedera testnet account
- npm or yarn

### Installation
```bash
git clone https://github.com/yourusername/run-am.git 
cd run-am
npm install
```

### Setup
1. Create `.env` file:
```env
VITE_HEDERA_ACCOUNT_ID=0.0.xxxxx
VITE_HEDERA_PRIVATE_KEY=302...
RUNAM_RECEIPT_TOKEN_ID
```

To retrieve `RUNAM_RECEIPT_TOKEN_ID`, at the root of your repo: 

```
set -a; source .env; set +a   # or: export $(grep -v '^#' .env | xargs)
node --input-type=module -e "import('./src/hedera/hedera-mint.js').then(m=>m.createReceiptCollection()).then(console.log).catch(console.error)"
```

2. One-time setup:
```bash
npm run setup-hedera
# Save Token ID to .env as VITE_TOKEN_ID
```

### Running
```bash
npm run dev
```

---

## Demo

**Live Demo:** [run-am.replit.app](https://run-am.replit.app)  
**Video Demo:** [YouTube](url)  
**Pitch Deck:** [`docs/pitch-deck.pdf`](docs/pitch-deck.pdf)



---

**Star on GitHub** ⭐ | **Built with ♥️ for Hedera & Africa**
