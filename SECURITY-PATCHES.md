# October 2026 security maintenance

Next.js and eslint-config-next are pinned to 16.4.1. Compatible direct dependencies and the Bun lockfile are refreshed, including React 19.3.1, current Tiptap packages, and patched transitive dependencies.

Bun 1.3.9 remains the package manager. Next.js runs under Node rather than forcing Bun as the runtime: the old `bun --bun next build` fails on the patched Next.js production runtime. The theme button now subscribes to client storage through useSyncExternalStore, keeping its server hydration snapshot stable without synchronous setState in an effect.

Verification: lint and production build pass. The dependency audit is reduced to the development glob parser braces (GHSA-vfj7-8cjw-p6xm), for which there is no upstream fixed version. No database schema, auth grant, or deployment secret changes are included.
