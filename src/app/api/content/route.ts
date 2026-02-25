import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getStoredContent, saveContent, hasDb } from "@/lib/db";
import type { PortfolioContent } from "@/lib/content-types";
import { getStaticContent, mergeContent } from "@/lib/content";

export async function GET() {
  const staticContent = getStaticContent();
  const stored = await getStoredContent();
  const merged = mergeContent(staticContent, stored);
  return Response.json({ ...merged, _hasSupabase: hasDb });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasDb) {
    return Response.json(
      {
        error:
          "No database configured. Add DATABASE_URL (Neon) or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (Supabase) to .env",
      },
      { status: 503 }
    );
  }

  const body = (await request.json()) as Partial<PortfolioContent>;
  const staticContent = getStaticContent();
  const stored = await getStoredContent();
  const merged = mergeContent(staticContent, { ...stored, ...body });

  const { error } = await saveContent(merged);
  if (error) {
    return Response.json({ error }, { status: 500 });
  }
  return Response.json({ ok: true });
}
