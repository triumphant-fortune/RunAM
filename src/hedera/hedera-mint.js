import {
  AccountId,
  Client,
  Hbar,
  PrivateKey,
  TokenCreateTransaction,
  TokenMintTransaction,
  TokenSupplyType,
  TokenType,
} from "@hashgraph/sdk";

const NETWORK = "testnet";
const MAX_RETRIES = 3;
const METADATA_BYTES_LIMIT = 100;
const METADATA_ROUTE_LIMITS = [40, 24, 12, 0];

const RECEIPT_TOKEN_NAME = "RunAm Delivery Receipt";
const RECEIPT_TOKEN_SYMBOL = "RAM";

function getEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var ${name}`);
  }
  return value;
}

function createClient() {
  const accountId = AccountId.fromString(getEnv("HEDERA_ACCOUNT_ID"));
  const privateKey = PrivateKey.fromString(getEnv("HEDERA_PRIVATE_KEY"));

  const client = Client.forName(NETWORK);
  client.setOperator(accountId, privateKey);
  return { client, accountId, privateKey };
}

function buildHashscanUrl(tokenId, serial) {
  return `https://hashscan.io/${NETWORK}/token/${tokenId}/${serial}`;
}

function truncateToBytes(value, maxBytes) {
  if (typeof value !== "string") return value;
  let current = value;
  while (Buffer.byteLength(current) > maxBytes && current.length > 0) {
    current = current.slice(0, -1);
  }
  return current;
}

function enforceMetadataSize(metadata) {
  for (const limit of METADATA_ROUTE_LIMITS) {
    const cloned = { ...metadata };
    if (cloned.r && limit > 0) {
      cloned.r = truncateToBytes(cloned.r, limit);
    } else if (limit === 0) {
      delete cloned.r;
    }
    const json = JSON.stringify(cloned);
    if (Buffer.byteLength(json) <= METADATA_BYTES_LIMIT) {
      return cloned;
    }
  }
  throw new Error("Metadata exceeds on-chain size limit");
}

async function withRetry(fn) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      const isLast = attempt === MAX_RETRIES;
      if (isLast) break;
      await new Promise((resolve) => setTimeout(resolve, 300 * attempt));
    }
  }
  throw lastError;
}

export async function createReceiptCollection() {
  const { client, accountId, privateKey } = createClient();

  const tokenId = await withRetry(async () => {
    const tx = await new TokenCreateTransaction()
      .setTokenName(RECEIPT_TOKEN_NAME)
      .setTokenSymbol(RECEIPT_TOKEN_SYMBOL)
      .setTokenType(TokenType.NonFungibleUnique)
      .setSupplyType(TokenSupplyType.Infinite)
      .setTreasuryAccountId(accountId)
      .setAdminKey(privateKey)
      .setSupplyKey(privateKey)
      .setPauseKey(privateKey)
      .setWipeKey(privateKey)
      .setMaxTransactionFee(new Hbar(10))
      .freezeWith(client)
      .sign(privateKey);

    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);
    if (!receipt.tokenId) {
      throw new Error("Token creation returned no tokenId");
    }
    return receipt.tokenId.toString();
  });

  client.close();
  return tokenId;
}

function getTokenId() {
  return getEnv("RUNAM_RECEIPT_TOKEN_ID");
}

async function mintReceipt(metadataObj) {
  const tokenId = getTokenId();
  const { client, privateKey } = createClient();
  const metadataBytes = Buffer.from(JSON.stringify(metadataObj));

  const result = await withRetry(async () => {
    const tx = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata([metadataBytes])
      .setMaxTransactionFee(new Hbar(10))
      .freezeWith(client)
      .sign(privateKey);

    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);
    const serial = receipt.serials?.[0]?.toNumber();
    if (!serial) {
      throw new Error("Mint did not return a serial number");
    }

    return {
      tokenId,
      serial,
      transactionId: response.transactionId.toString(),
    };
  });

  client.close();
  return {
    ...result,
    hashscanUrl: buildHashscanUrl(tokenId, result.serial),
  };
}

export async function mintBookingReceipt({ bookingId, senderId, route, usdcAmount }) {
  if (!bookingId || !senderId || !route || usdcAmount === undefined) {
    throw new Error("Missing booking receipt fields");
  }
  const metadata = {
    t: "B",
    s: "P",
    bid: bookingId,
    sid: senderId,
    r: route.replace(/\s+/g, " ").replace(/→/g, "->"),
    amt: Number(usdcAmount),
    ts: Math.floor(Date.now() / 1000),
  };

  return mintReceipt(enforceMetadataSize(metadata));
}

export async function mintDeliveryReceipt({ bookingId, travelerId }) {
  if (!bookingId || !travelerId) {
    throw new Error("Missing delivery receipt fields");
  }
  const metadata = {
    t: "D",
    s: "C",
    bid: bookingId,
    tid: travelerId,
    ts: Math.floor(Date.now() / 1000),
  };

  return mintReceipt(enforceMetadataSize(metadata));
}
