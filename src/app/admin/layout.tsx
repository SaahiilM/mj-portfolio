import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session && !children) return null;

  return (
    <div className="min-h-screen bg-background">
      {session && (
        <header className="sticky top-0 z-10 border-b border-border bg-card">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
            <Link href="/admin" className="text-lg font-semibold text-foreground">
              Portfolio Admin
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground"
              >
                View site
              </Link>
              <Link
                href="/api/auth/signout"
                className="text-sm text-muted hover:text-foreground"
              >
                Sign out
              </Link>
            </div>
          </div>
        </header>
      )}
      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
    </div>
  );
}
