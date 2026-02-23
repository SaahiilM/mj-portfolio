"use client";

import { useState } from "react";
import Cal from "@calcom/embed-react";

const CAL_LINK = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
const IS_CALCOM = CAL_LINK.includes("cal.com");
const IS_EXTERNAL = CAL_LINK.startsWith("http");

/** Embed expects path only (e.g. maitreyeej/30min), not full URL or query params. */
function getCalEmbedLink(url: string): string {
  if (!url.includes("cal.com")) return url;
  try {
    const path = new URL(url.split("?")[0]).pathname.replace(/^\//, "");
    return path || url;
  } catch {
    return url.replace(/^https?:\/\/cal\.com\/?/i, "").split("?")[0];
  }
}

function scrollToContact() {
  const el = document.getElementById("contact");
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ScheduleCta() {
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        Open to coffee chats & conversations
      </h3>
      <p className="mb-4 text-sm text-muted">
        I&apos;m happy to connect, share experiences, and explore opportunities.
        Schedule a short call or drop a message below.
      </p>
      {IS_CALCOM && CAL_LINK ? (
        <>
          <button
            type="button"
            onClick={() => setShowEmbed(true)}
            className="inline-flex items-center justify-center rounded-full border border-accent bg-transparent px-6 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
          >
            Schedule a chat
          </button>
          {showEmbed && (
            <>
              <div className="mt-6 min-h-[400px] w-full overflow-hidden rounded-lg [&_iframe]:min-h-[400px]">
                <Cal
                  calLink={getCalEmbedLink(CAL_LINK)}
                  style={{ width: "100%", height: "100%", minHeight: 400 }}
                />
              </div>
              <p className="mt-3 text-xs text-muted">
                Or{" "}
                <a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent hover:underline"
                >
                  open scheduling in a new tab
                </a>
              </p>
            </>
          )}
        </>
      ) : IS_EXTERNAL ? (
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-accent bg-transparent px-6 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
        >
          Schedule a chat
        </a>
      ) : (
        <button
          type="button"
          onClick={scrollToContact}
          className="inline-flex items-center justify-center rounded-full border border-accent bg-transparent px-6 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
        >
          Schedule a chat
        </button>
      )}
    </div>
  );
}
