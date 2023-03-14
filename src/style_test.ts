import { assertEquals } from "https://deno.land/std@0.182.0/testing/asserts.ts";

import { to_css } from "./style.ts";

Deno.test("basic", () => {
  assertEquals(
    to_css({
      div: {
        color: "#123",
      },
    }),
    `div {
  color: #123;
}`,
  );
});

Deno.test("nested", () => {
  assertEquals(
    to_css({
      a: {
        b: {
          color: "#123",
        },
      },
    }),
    `a {
  b {
    color: #123;
  }
}`,
  );
});
