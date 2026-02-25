import { getPortfolioContent } from "@/lib/content";
import { PortfolioContent } from "@/components/PortfolioContent";

export default async function Home() {
  const content = await getPortfolioContent();
  return <PortfolioContent editableContent={content} />;
}
