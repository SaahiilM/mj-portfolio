"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mj29@fordham.edu";
const CONTACT_SERVICE_URL = process.env.NEXT_PUBLIC_CONTACT_SERVICE_URL;

function buildMailtoUrl(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMessage("Name, email, and message are required.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    const fallbackMailto = () => {
      window.location.href = buildMailtoUrl(name, email, message);
      setStatus("success");
      form.reset();
    };

    if (!CONTACT_SERVICE_URL) {
      fallbackMailto();
      return;
    }

    try {
      const res = await fetch(CONTACT_SERVICE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (!res.ok) {
        fallbackMailto();
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      fallbackMailto();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:max-w-md">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="Your name"
          disabled={status === "sending"}
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="you@example.com"
          disabled={status === "sending"}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full resize-y rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="Hi Maitreyee, I'd like to connect..."
          disabled={status === "sending"}
        />
      </div>
      {status === "success" && (
        <p className="text-sm font-medium text-accent">
          Thanks! I&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p className="text-xs text-muted">
        If form delivery is unavailable, this will open your email app as a fallback.
      </p>
    </form>
  );
}
