import crypto from "crypto";

const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function getSecret(): string {
  const s = process.env.ACCESS_CODE_SECRET;
  if (!s) throw new Error("ACCESS_CODE_SECRET env var is not set");
  return s;
}

interface TokenPayload {
  code: string;
  email: string;
  issuedAt: number;
}

function encodePayload(payload: TokenPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function computeSig(data: string): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(data)
    .digest("base64url");
}

/** Create a signed token: base64url(payload).signature */
export function createToken(code: string, email: string): string {
  const data = encodePayload({
    code,
    email: email.toLowerCase(),
    issuedAt: Date.now(),
  });
  return `${data}.${computeSig(data)}`;
}

export type VerifyResult =
  | { valid: true }
  | { valid: false; reason: "invalid" | "expired" };

/** Verify a token + submitted code — fully stateless, no DB needed */
export function verifyToken(
  token: string,
  submittedCode: string,
): VerifyResult {
  try {
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) return { valid: false, reason: "invalid" };

    const data = token.slice(0, dotIndex);
    const sig = token.slice(dotIndex + 1);

    const expectedSig = computeSig(data);

    // Constant-time comparison to prevent timing attacks
    if (
      sig.length !== expectedSig.length ||
      !crypto.timingSafeEqual(
        Buffer.from(sig, "base64url"),
        Buffer.from(expectedSig, "base64url"),
      )
    ) {
      return { valid: false, reason: "invalid" };
    }

    const payload = JSON.parse(
      Buffer.from(data, "base64url").toString("utf8"),
    ) as TokenPayload;

    if (Date.now() - payload.issuedAt > TTL_MS) {
      return { valid: false, reason: "expired" };
    }

    if (payload.code !== submittedCode.trim()) {
      return { valid: false, reason: "invalid" };
    }

    return { valid: true };
  } catch {
    return { valid: false, reason: "invalid" };
  }
}
