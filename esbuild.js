import esbuild from "esbuild"

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outdir: "pkg",
    bundle: true,
    sourcemap: true,
    splitting: true,
    format: "esm",
    target: ["esnext"],
  })
  .catch(() => process.exit(1))
