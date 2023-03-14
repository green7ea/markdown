import { assertEquals } from "https://deno.land/std@0.182.0/testing/asserts.ts";

import { rewrite_url } from "./markdown.ts";

const rewrite = rewrite_url("/home/test", "/tmp");

Deno.test("replace home", () => {
  assertEquals(rewrite({ href: "~/123/abc.jpg" }), "/home/test/123/abc.jpg");
});

Deno.test("relative path", () => {
  assertEquals(rewrite({ href: "abc.jpg" }), "/tmp/abc.jpg");

  assertEquals(rewrite({ href: "./123/abc.jpg" }), "/tmp/123/abc.jpg");
});

Deno.test("absolute path", () => {
  assertEquals(rewrite({ href: "/abc/test.jpg" }), "/abc/test.jpg");
});

Deno.test("section", () => {
  assertEquals(rewrite({ href: "#section-header" }), "#section-header");
});

Deno.test("normal url", () => {
  assertEquals(
    rewrite({ href: "https://news.ycombinator.com" }),
    "https://news.ycombinator.com",
  );
});
