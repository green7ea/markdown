import chokidar from "npm:chokidar@3.5.3";

import { build_markdown } from "./markdown.ts";
import { error_to_html, wrap_body_in_html } from "./html.ts";
import { markdownTransformer } from "./transformers/markdown.ts";
import { imageTransformer } from "./transformers/image.ts";
import { directoryTransformer } from "./transformers/directory.ts";
import { staticTransformer } from "./transformers/static.ts";

function handle_websocket(ws: WebSocket, uri: string) {
  ws.onopen = () => {
    const path = decodeURI(uri);
    const watcher = chokidar.watch(path);
    watcher.on("change", async () => {
      try {
        const markdown = await Deno.readTextFile(path);
        const data = await build_markdown(markdown.toLocaleString(), path);
        ws.send(data.toString());
      } catch (error) {
        const html = error_to_html(error);
        ws.send(html);
      }
    });

    ws.onclose = () => watcher.close();
  };

  ws.onerror = (err) => console.error(`Websocket error ${err}`);
}

interface Content {
  type: string;
  data: unknown;
  error: boolean;
}

function to_response({ type, data, error }: Content): Response {
  return new Response(data, {
    status: error ? 404 : 200,
    headers: [["content-type", type]],
  });
}

const transformers = [
  staticTransformer,
  markdownTransformer,
  imageTransformer,
  directoryTransformer,
];

async function serve_file(uri: string) {
  const path = decodeURI(uri);

  try {
    for (const transformer of transformers) {
      const can_transform = await transformer.can_transform(path);
      if (can_transform) {
        return transformer.to_response(path);
      }
    }

    throw `No transformer for '${path}'`;
  } catch (error) {
    console.error(error);
    const data = wrap_body_in_html(error_to_html(error));

    return {
      type: "text/html; charset=utf-8",
      data,
      error: true,
    };
  }
}

async function handle_connection(connection: Deno.Conn, filename: string) {
  const handle_http = Deno.serveHttp(connection);

  for await (const http of handle_http) {
    const { headers } = http.request;
    const url = new URL(http.request.url);

    const upgradeToWs = headers.get("upgrade")?.toLowerCase() === "websocket";
    const path = url.pathname === "/" ? filename : url.pathname;

    if (upgradeToWs) {
      const { socket, response } = Deno.upgradeWebSocket(http.request);
      handle_websocket(socket, path);
      http.respondWith(response);
      continue;
    }

    const content = await serve_file(path);
    http.respondWith(to_response(content));
  }
}

export async function serve(index: string, port: number) {
  const server = Deno.listen({ port });
  for await (const req of server) {
    handle_connection(req, index);
  }
}
