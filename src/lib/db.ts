import { neon } from "@neondatabase/serverless";
import { createClient } from "@supabase/supabase-js";
import type { PortfolioContent } from "./content-types";

const ROW_ID = "main";

const DATABASE_URL = process.env.DATABASE_URL;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Use Neon if DATABASE_URL is set, else Supabase if configured */
export type DbProvider = "neon" | "supabase" | null;

const provider: DbProvider = DATABASE_URL ? "neon" : SUPABASE_URL && SUPABASE_KEY ? "supabase" : null;

export const hasDb = !!provider;

const supabase =
  provider === "supabase" && SUPABASE_URL && SUPABASE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_KEY)
    : null;

export async function getStoredContent(): Promise<Partial<PortfolioContent> | null> {
  if (!provider) return null;

  if (provider === "neon" && DATABASE_URL) {
    const sql = neon(DATABASE_URL);
    const rows = await sql`SELECT data FROM portfolio_content WHERE id = ${ROW_ID} LIMIT 1`;
    const row = rows[0] as { data: Partial<PortfolioContent> } | undefined;
    return row?.data ?? null;
  }

  if (provider === "supabase" && supabase) {
    const { data } = await supabase
      .from("portfolio_content")
      .select("data")
      .eq("id", ROW_ID)
      .single();
    return data?.data as Partial<PortfolioContent> | null;
  }

  return null;
}

export async function saveContent(data: PortfolioContent): Promise<{ error?: string }> {
  if (!provider) {
    return { error: "No database configured" };
  }

  if (provider === "neon" && DATABASE_URL) {
    try {
      const sql = neon(DATABASE_URL);
      await sql`
        INSERT INTO portfolio_content (id, data, updated_at)
        VALUES (${ROW_ID}, ${data}, now())
        ON CONFLICT (id) DO UPDATE SET
          data = EXCLUDED.data,
          updated_at = now()
      `;
      return {};
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Unknown error" };
    }
  }

  if (provider === "supabase" && supabase) {
    const { error } = await supabase
      .from("portfolio_content")
      .upsert(
        { id: ROW_ID, data, updated_at: new Date().toISOString() },
        { onConflict: "id" }
      );
    return error ? { error: error.message } : {};
  }

  return { error: "No database configured" };
}
