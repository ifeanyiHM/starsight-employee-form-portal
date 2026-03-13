import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createToken } from "@/utils/AccessToken";

const PORTAL_URL =
  process.env.NEXT_PUBLIC_PORTAL_URL ||
  "https://starsight-employee-form-portal.vercel.app";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const code = crypto.randomInt(100000, 999999).toString();
    const token = createToken(code, email);

    // The employee clicks this link — the portal picks up the token from the
    // URL and stores it in localStorage automatically, then the employee just
    // types their 6-digit code.
    const accessLink = `${PORTAL_URL}?t=${encodeURIComponent(token)}`;

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
          <p style="color:#374151;">
            Click the button below to open the portal, then enter your 6-digit access code when prompted.
          </p>
          <div style="text-align:center;margin:20px 0;">
            <a href="${accessLink}"
               style="display:inline-block;background:#44b276;color:#fff;text-decoration:none;padding:12px 32px;border-radius:8px;font-weight:bold;font-size:15px;">
              Open Employee Portal
            </a>
          </div>
          <p style="color:#374151;">Your access code is:</p>
          <div style="text-align:center;margin:20px 0;">
            <span style="font-size:40px;font-weight:bold;letter-spacing:12px;color:#44b276;background:#f0fdf4;padding:16px 28px;border-radius:10px;display:inline-block;">
              ${code}
            </span>
          </div>
          <p style="color:#6b7280;font-size:13px;">
            If the button above does not work, copy and paste this link into your browser:<br/>
            <a href="${accessLink}" style="color:#44b276;word-break:break-all;">${accessLink}</a>
          </p>
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
