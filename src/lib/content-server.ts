import "server-only";
import { getStoredContent } from "./db";
import { getStaticContent, mergeContent } from "./content";
import type { PortfolioContent } from "./content-types";

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const staticContent = getStaticContent();
  const stored = await getStoredContent();
  return mergeContent(staticContent, stored);
}
