/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import { expect, test } from "vitest";

// Every Convex module, so convex-test can find the generated code and the functions.
const modules = import.meta.glob("./**/*.ts");

test("a document written in the test backend can be read back", async () => {
  const t = convexTest({ modules });

  const id = await t.run((ctx) => ctx.db.insert("notes", { text: "hello" }));
  const note = await t.run((ctx) => ctx.db.get(id));

  expect(note?.text).toBe("hello");
});

test("each test backend starts empty", async () => {
  const first = convexTest({ modules });
  await first.run((ctx) => ctx.db.insert("notes", { text: "hello" }));

  const second = convexTest({ modules });
  const note = await second.run((ctx) => ctx.db.query("notes").first());

  expect(note).toBeNull();
});
