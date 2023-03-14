import { Transformer } from "./transformer.ts";

import { dirname, join, posix } from "https://deno.land/std/path/mod.ts";

const url = join(dirname(posix.fromFileUrl(import.meta.url)), "../favicon.ico");

export const faviconTransformer: Transformer = {
  can_transform(path: string) {
    return Promise.resolve(path === "/favicon.ico");
  },

  async to_response(_path: string) {
    const data = await Deno.readFile(url);

    return {
      type: "image/x-icon",
      data,
      error: false,
    };
  },
};
