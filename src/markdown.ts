import { remark } from "npm:remark@14";
import gfm from "npm:remark-gfm@3.0.1";

import highlight from "npm:rehype-highlight@7";
import katex from "npm:rehype-katex@7";
import links from "npm:rehype-autolink-headings@7";
import raw from "npm:rehype-raw@7";
import slug from "npm:rehype-slug@6";
import stringify from "npm:rehype-stringify@7";
import toc from "npm:rehype-toc@3";
import urls from "npm:rehype-urls@1.2";

import math from "npm:remark-math@6";
import mermaid from "npm:remark-mermaid@0.2";
import rehype from "npm:remark-rehype@11";

import * as path from "https://deno.land/std/path/mod.ts";

export async function build_markdown(markdown: string, file: string) {
  const base = path.dirname(file);
  const home = Deno.env.get("HOME") ?? "";

  const markdown_ast = await remark()
    .use(gfm)
    .use(math)
    .use(mermaid, { simple: true })
    .use(rehype, { allowDangerousHtml: true })
    .use(highlight)
    .use(katex)
    .use(slug)
    .use(links)
    // Why is the typing on 'toc' off?
    .use(toc)
    .use(raw)
    .use(stringify)
    .use(urls, rewrite_url(home, base))
    .process(markdown);

  return markdown_ast;
}

export function rewrite_url(home: string, base_path: string) {
  return (url: { href: string }) => {
    const { href } = url;

    if (href.startsWith("~/")) {
      return path.join(home, href.slice(2));
    }

    if (
      href.startsWith("#") ||
      path.isAbsolute(href) ||
      href.match(/^[a-zA-Z]+:\/\//)
    ) {
      return href;
    }

    return path.join(base_path, href);
  };
}
