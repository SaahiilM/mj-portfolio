import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbProvider, getStoredContent, saveContent, hasDb } from "@/lib/db";
import type { PortfolioContent } from "@/lib/content-types";
import { getStaticContent, mergeContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const staticContent = getStaticContent();
  const stored = await getStoredContent();
  const merged = mergeContent(staticContent, stored);
  return Response.json({ ...merged, _hasSupabase: hasDb, _dbProvider: dbProvider });
}

export async function POST(request: Request) {
  console.info("[api/content] Save request received", { provider: dbProvider });
  const session = await getServerSession(authOptions);
  if (!session) {
    console.warn("[api/content] Unauthorized save request");
    return Response.json({ error: "Unauthorized. Please sign in again." }, { status: 401 });
  }

  if (!hasDb) {
    return Response.json(
      {
        error:
          "No database configured. Add DATABASE_URL (or POSTGRES_URL) for Neon, or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY for Supabase in .env",
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
    console.error("[api/content] Save failed", { provider: dbProvider, error });
    return Response.json({ error }, { status: 500 });
  }

  console.info("[api/content] Save successful", { provider: dbProvider });

  revalidatePath("/");
  revalidatePath("/p/[role]", "page");

  return Response.json({ ok: true });
}
