import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Backend tests only for now. The Edge runtime mimics the Convex runtime.
    include: ["convex/**/*.test.ts"],
    environment: "edge-runtime",
  },
});
