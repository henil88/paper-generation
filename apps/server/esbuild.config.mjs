import { env } from "@paper-generation/env/server";
import * as esbuild from "esbuild";

const isProduction = env.NODE_ENV === "production";

esbuild
  .build({
    entryPoints: ["src/server.ts"],
    bundle: true,
    platform: "node",
    target: "node22",
    format: "cjs",
    outfile: "dist/server.js",
    minify: isProduction,
    treeShaking: true,
    packages: "external",
    sourcemap: !isProduction,
    external: ["@paper-generation/env/server", "@paper-generation/db"],
  })
  .catch(() => process.exit(1));
