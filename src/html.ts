export function error_to_html<T>(error: T) {
  return `
        <div>
            <h1>Error</h1>
            ${error.toString()}
            <pre>
              <code class="hljs">
                ${JSON.stringify(error, null, 2)}
              </code>
            </pre>
        </div>
`;
}

export function wrap_body_in_html(body: string) {
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width,initial-scale=1" />
              <link rel="stylesheet" href="/static/katex.min.css">
              <link rel="stylesheet" href="/static/tufte.css">
            </head>
            <body>
            <article id="article">
            ${body}
            </article>
            <script type="module">
            import mermaid from '/static/mermaid.esm.min.mjs';

            function update_content(new_content) {
                document.getElementById('article').innerHTML = new_content;
            }

            function connect() {
              const l = window.location;
              const url = 'ws://' + l.host + l.pathname;
              const ws = new WebSocket(url);

              ws.addEventListener('message', (event) => {
                update_content(event.data);
                mermaid.run();
              });
            }

            mermaid.initialize({
              startOnLoad: true,
              theme: 'neutral',
            });
            window.addEventListener('load', connect);
            </script>
            </body>
            </html>`;
}
