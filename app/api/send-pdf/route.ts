import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

import type Mail from "nodemailer/lib/mailer"; // ✅ Import types

interface NodeMailerError extends Error {
  code?: string; // Nodemailer and network errors often have this
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const fullName = data.get("fullName") || "Unknown User";

    // Always include generated PDF
    const generatedFile = data.get("file") as File | null;
    if (!generatedFile) {
      return NextResponse.json({ error: "Missing PDF file" }, { status: 400 });
    }

    const attachments: Mail.Attachment[] = []; // ✅ Strong typing

    // Add generated PDF
    attachments.push({
      filename: `background-check-form-${fullName}.pdf`,
      content: Buffer.from(await generatedFile.arrayBuffer()),
      contentType: "application/pdf",
    });

    // Add uploaded files (attachment_1, attachment_2, …)
    for (const [key, value] of data.entries()) {
      if (key.startsWith("attachment_") && value instanceof File) {
        attachments.push({
          filename: value.name,
          content: Buffer.from(await value.arrayBuffer()),
          contentType: value.type,
        });
      }
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 60_000,
      greetingTimeout: 60_000,
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "iheme.ifeanyi@yahoo.com",
      subject: "Form Submission Confirmation",
      html: `
        <h2>Form Submission Received</h2>
        <p><strong> From:</strong>Employee Name: ${fullName}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <p>Thank you for your submission. Your form data and uploaded files are attached.</p>
     
      `,
      attachments,
    });

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error: unknown) {
    const err = error as NodeMailerError;
    if (err.code === "ETIMEDOUT") {
      console.error("❌ Internet failure (timeout):", err);
      return NextResponse.json(
        { error: "Internet failure. Please try again." },
        { status: 500 }
      );
    }

    console.error("❌ Error sending PDF:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

// export async function POST(req: NextRequest) {
//   // ✅ Correct typing here
//   try {
//     const data = await req.formData(); // ✅ Now TypeScript recognizes formData()
//     const file = data.get("file") as File;
//     const email = data.get("email") || "Unknown User";

//     if (!file) {
//       return NextResponse.json({ error: "Missing PDF file" }, { status: 400 });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());

//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: process.env.SMTP_USER,
//       to: "iheme.ifeanyi@yahoo.com",
//       // to: "obianorue123@gmail.com",
//       subject: "Form Submission Confirmation",
//       html: `
//         <h2>Form Submission Received</h2>
//         <p><strong>From:</strong> ${email}</p>
//         <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
//         <p>Thank you for your submission. Your form data is attached.</p>
//       `,
//       attachments: [
//         {
//           filename: `form-submission-${Date.now()}.pdf`,
//           content: buffer,
//           contentType: "application/pdf",
//         },
//       ],
//     });

//     return NextResponse.json({
//       success: true,
//       messageId: info.messageId,
//     });
//   } catch (error) {
//     console.error("❌ Error sending PDF:", error);
//     return NextResponse.json(
//       { error: "Failed to send email" },
//       { status: 500 }
//     );
//   }
// }
