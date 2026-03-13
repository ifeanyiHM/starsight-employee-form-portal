import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// import "@/types/globals";

// Initialise the in-memory store once per server process
if (!global.accessCodes) {
  global.accessCodes = new Map();
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Generate a 6-digit code
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    global.accessCodes!.set(email.toLowerCase(), { code, expiresAt, email });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Starsight HR Portal" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Starsight Employee Portal Access Code",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:10px;">
          <h2 style="color:#111827;text-align:center;margin-bottom:8px;">Starsight Employee Portal</h2>
          <p style="color:#374151;margin-top:0;text-align:center;font-size:14px;">Access Code</p>
          <p style="color:#374151;">Hello,</p>
          <p style="color:#374151;">Your one-time access code for the Employee Forms Portal is:</p>
          <div style="text-align:center;margin:28px 0;">
            <span style="font-size:40px;font-weight:bold;letter-spacing:12px;color:#44b276;background:#f0fdf4;padding:16px 28px;border-radius:10px;display:inline-block;">
              ${code}
            </span>
          </div>
          <p style="color:#6b7280;font-size:14px;">This code expires in <strong>24 hours</strong>.</p>
          <p style="color:#6b7280;font-size:14px;">If you did not request this code, please ignore this email.</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
          <p style="color:#9ca3af;font-size:12px;text-align:center;">
            &copy; ${new Date().getFullYear()} Starsight Technologies. All rights reserved.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Access code sent to your email.",
    });
  } catch (error) {
    console.error("Error sending access code:", error);
    return NextResponse.json(
      { error: "Failed to send access code. Please try again." },
      { status: 500 },
    );
  }
}
