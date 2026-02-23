import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const TO_EMAIL = process.env.RESEND_TO ?? process.env.NEXT_PUBLIC_CONTACT_EMAIL;
const FROM_EMAIL = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";

export async function POST(request: Request) {
  if (!resend || !TO_EMAIL) {
    return NextResponse.json(
      { error: "Contact (Resend) not configured" },
      { status: 503 }
    );
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  const subject = `Portfolio message from ${name}`;
  const text = `From: ${name} <${email}>\n\n${message}`;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
