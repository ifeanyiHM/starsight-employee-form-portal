import { NextRequest, NextResponse } from "next/server";
// import "@/types/globals";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { error: "Access code is required" },
        { status: 400 },
      );
    }

    const trimmedCode = code.trim();

    // Search all stored codes for a matching one
    if (!global.accessCodes || global.accessCodes.size === 0) {
      return NextResponse.json(
        { error: "Invalid code. Please check and try again." },
        { status: 401 },
      );
    }

    let matchedEmail: string | null = null;

    for (const [email, entry] of global.accessCodes.entries()) {
      if (entry.code === trimmedCode) {
        if (Date.now() > entry.expiresAt) {
          global.accessCodes.delete(email);
          return NextResponse.json(
            {
              error: "This code has expired. Please contact HR for a new one.",
            },
            { status: 410 },
          );
        }
        matchedEmail = email;
        break;
      }
    }

    if (!matchedEmail) {
      return NextResponse.json(
        { error: "Invalid code. Please check and try again." },
        { status: 401 },
      );
    }

    return NextResponse.json({ success: true, message: "Access granted." });
  } catch (error) {
    console.error("Error verifying code:", error);
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 500 },
    );
  }
}
