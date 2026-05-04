import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ─── In-memory rate limiter ──────────────────────────────────────────────── */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfter: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  record.count++;
  return { allowed: true };
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ─── Route handler ───────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    /* Rate limiting */
    const forwarded = req.headers.get("x-forwarded-for");
    const ip =
      (forwarded ? forwarded.split(",")[0].trim() : null) ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const { allowed, retryAfter } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        {
          error: `Too many requests. Please try again in ${Math.ceil((retryAfter ?? 900) / 60)} minutes.`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfter) },
        }
      );
    }

    /* Parse body */
    let body: {
      name?: string;
      email?: string;
      message?: string;
      inquiry_type?: string;
    };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const inquiryType = body.inquiry_type?.trim() ?? "";

    /* Validation */
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    if (name.length > 100) {
      return NextResponse.json(
        { error: "Name must be 100 characters or fewer." },
        { status: 400 }
      );
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (email.length > 254) {
      return NextResponse.json(
        { error: "Email address is too long." },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message must be 5,000 characters or fewer." },
        { status: 400 }
      );
    }

    /* Send email via Resend */
    const { error: resendError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "adilumer2005@gmail.com",
      replyTo: email,
      subject: `[Portfolio] New message from ${name}${inquiryType ? ` — ${inquiryType}` : ""}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#09090b;color:#fafafa;border-radius:12px;">
          <h2 style="margin:0 0 24px;font-size:20px;font-weight:700;color:#818cf8;">
            New Contact Message
          </h2>

          ${
            inquiryType
              ? `<p style="margin:0 0 8px;font-size:13px;color:#71717a;">
              <strong style="color:#a1a1aa;">Type:</strong> ${escapeHtml(inquiryType)}
            </p>`
              : ""
          }

          <p style="margin:0 0 8px;font-size:13px;color:#71717a;">
            <strong style="color:#a1a1aa;">Name:</strong> ${escapeHtml(name)}
          </p>
          <p style="margin:0 0 20px;font-size:13px;color:#71717a;">
            <strong style="color:#a1a1aa;">Email:</strong>
            <a href="mailto:${escapeHtml(email)}" style="color:#818cf8;">${escapeHtml(email)}</a>
          </p>

          <div style="padding:16px;background:#18181b;border-radius:8px;border:1px solid #27272a;">
            <p style="margin:0;font-size:14px;color:#d4d4d8;white-space:pre-wrap;">${escapeHtml(message)}</p>
          </div>

          <p style="margin:24px 0 0;font-size:11px;color:#52525b;">
            Sent from your portfolio contact form
          </p>
        </div>
      `,
    });

    if (resendError) {
      console.error("[contact] Resend error:", resendError);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
