"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authenticating, setAuthenticating] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (authenticating) return;
    setError("");
    setAuthenticating(true);

    try {
      const res = await signIn("credentials", {
        password,
        redirect: false,
        callbackUrl,
      });
      if (res?.error) {
        setError("Invalid password");
        return;
      }
      if (res?.ok) window.location.href = callbackUrl;
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="mb-4 text-xl font-semibold text-foreground">Admin login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              required
              autoFocus
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={authenticating}
            className="w-full rounded-full bg-accent py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
          >
            {authenticating ? "Authenticating…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
