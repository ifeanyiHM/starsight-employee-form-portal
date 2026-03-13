import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/AccessToken";

export async function POST(req: NextRequest) {
  try {
    const { code, token } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Access code is required" },
        { status: 400 },
      );
    }

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "No token found. Please ask HR to resend the code." },
        { status: 400 },
      );
    }

    const result = verifyToken(token, code);

    if (!result.valid) {
      if (result.reason === "expired") {
        return NextResponse.json(
          { error: "This code has expired. Please ask HR to send a new one." },
          { status: 410 },
        );
      }
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
