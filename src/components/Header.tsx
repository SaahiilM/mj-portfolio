"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

type HeaderProps = { basePath?: string };

export function Header({ basePath = "" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const prefix = basePath;

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold text-foreground no-underline"
        >
          MJ
        </Link>
        <div className="hidden items-center gap-4 sm:flex">
          <nav className="flex gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={prefix + href}
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted hover:text-foreground"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? (
              <span className="text-xl">×</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>
        </div>
      </div>
      {open && (
        <nav className="sm:hidden border-t border-border px-4 py-4">
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={prefix + href}
                  className="block text-sm font-medium text-muted hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
