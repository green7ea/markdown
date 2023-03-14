import { Transformer } from "./transformer.ts";

import { dirname, join, posix } from "https://deno.land/std/path/mod.ts";

const url = join(dirname(posix.fromFileUrl(import.meta.url)), "../tufte.css");

export const styleTransformer: Transformer = {
  can_transform(path: string) {
    return Promise.resolve(path === "/style.css");
  },

  async to_response(_path: string) {
    const data = await Deno.readFile(url);

    return {
      type: "text/css; charset=utf-8",
      data,
      error: false,
    };
  },
};
