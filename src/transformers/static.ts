import { Transformer } from "./transformer.ts";

import {
  dirname,
  extname,
  join,
  posix,
} from "https://deno.land/std/path/mod.ts";

const typing = {
  [".css"]: "text/css; charset=utf-8",
  [".ico"]: "image/x-icon",
};

const folder = dirname(posix.fromFileUrl(import.meta.url));
const path = join(folder, "..", "..", "static");
const static_files = {};
for await (const dir of Deno.readDir(path)) {
  if (dir.isFile) {
    const { name } = dir;
    const ext = extname(name);

    const type = typing[ext] ?? "none";
    const data = await Deno.readFile(join(path, name));

    static_files[name] = {
      type,
      data,
      error: false,
    };
  }
}

const error = {
  error: true,
};

export const staticTransformer: Transformer = {
  async can_transform(path: string) {
    if (path.startsWith("/static/")) {
      const file = path.substring("/static/".length);
      return file in static_files;
    }

    if (path === "/favicon.ico") {
      return "favicon.ico" in static_files;
    }

    return false;
  },

  async to_response(path: string) {
    if (path === "/favicon.ico") {
      return static_files["favicon.ico"] ?? error;
    }

    const file = path.substring("/static/".length);

    return static_files[file] ?? error;
  },
};
