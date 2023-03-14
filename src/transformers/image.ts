import { Transformer } from "./transformer.ts";
import * as path from "https://deno.land/std/path/mod.ts";

export const imageTransformer: Transformer = {
  can_transform(filepath: string) {
    const ext = path.extname(filepath).toLowerCase();

    return Promise.resolve(ext === ".jpg" || ext === ".png" || ext === ".svg");
  },

  async to_response(filepath: string) {
    const data = await Deno.readFile(filepath);

    return {
      type: "image/x-image",
      data,
      error: false,
    };
  },
};
