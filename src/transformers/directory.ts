import { Transformer } from "./transformer.ts";
import { wrap_body_in_html } from "../html.ts";

export const directoryTransformer: Transformer = {
  async can_transform(path: string) {
    try {
      const stat = await Deno.stat(path);

      return stat.isDirectory;
    } catch (_error) {
      return false;
    }
  },

  to_response(path: string) {
    const html = directory_to_html(path);
    const data = wrap_body_in_html(html.toString());

    return Promise.resolve({
      type: "text/html; charset=utf-8",
      data,
      error: false,
    });
  },
};

function directory_to_html(path: string) {
  return `<div> directory ${path} </div>`;
}
