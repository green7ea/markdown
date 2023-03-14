import { Transformer } from "./transformer.ts";
import { build_markdown } from "../markdown.ts";
import { wrap_body_in_html } from "../html.ts";
import * as path from "https://deno.land/std/path/mod.ts";

export const markdownTransformer: Transformer = {
  can_transform(filepath: string) {
    const ext = path.extname(filepath).toLowerCase();

    return Promise.resolve(ext === ".md");
  },

  async to_response(path: string) {
    const markdown = await Deno.readTextFile(path);
    const htmx = await build_markdown(markdown, path);
    const data = wrap_body_in_html(htmx.toString());

    return {
      type: "text/html; charset=utf-8",
      data,
      error: false,
    };
  },
};
