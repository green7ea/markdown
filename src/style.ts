import _ from "npm:lodash";

const style = {
  [":root"]: {
    ["--background"]: "#fdf6e3",
    ["--background-highlight"]: "#f8f8f8",
    ["--foreground"]: "#073642",
    ["--highlight"]: "#268bd2",
    ["--hover"]: "#d73",
  },

  ["@media (prefers-color-scheme: dark)"]: {
    [":root"]: {
      ["--background"]: "#151515",
      ["--background-highlight"]: "#222",
      ["--foreground"]: "#ddd",
    },

    ["input[type='checkbox']:before"]: {
      border: "0.2em solid rgba(255, 255, 255, 0.7)",
    },
  },

  ["@media (min-width: 1125px)"]: {
    ["nav.toc"]: {
      position: "fixed",
      top: "2em",
      right: "4em",
    },
  },

  html: {
    ["font-size"]: "18px",
    ["max-width"]: "100%",
  },

  body: {
    ["font-family"]: "'Open Sans Condensed', Verdana, Geneva, sans-serif",
    ["background-color"]: "var(--background)",
    color: "var(--foreground)",
    width: "100%",
    ["font-weight"]: 400,

    ["line-height"]: 1.45,
    padding: 0,
    margin: 0,
  },

  article: {
    margin: "0 auto",
    padding: "1rem 1rem",
    ["max-width"]: "42rem",
  },

  ["h1, h2, h3, h4, h5, h6"]: {
    ["font-family"]: "Arimo, Helvetica, sans-serif",
  },

  h1: {
    ["font-weight"]: 400,
    margin: "0.5rem 0.5rem 1.5rem 0.5rem",
    ["font-size"]: "2rem",
    ["line-height"]: 1.5,
    ["text-align"]: "center",
    ["text-decoration"]: "underline",
  },

  h2: {
    ["font-style"]: "italic",
    ["font-weight"]: 400,
    ["margin-top"]: "4rem",
    ["margin-bottom"]: "1.5rem",
    ["font-size"]: "1.7rem",
    ["line-height"]: 1.2,
  },

  h3: {
    ["font-style"]: "italic",
    ["font-weight"]: 400,
    ["font-size"]: "1.4rem",
    ["margin-top"]: "2rem",
    ["margin-bottom"]: "1.4rem",
    ["line-height"]: 1,
  },

  ["@media screen and (min-width: 40rem)"]: {
    h1: {
      ["font-size"]: "2.7rem",
    },
    h2: {
      ["font-size"]: "2.1rem",
    },
    h3: {
      ["font-size"]: "1.7rem",
    },
  },

  img: {
    display: "block",
    ["max-width"]: "100%",
    margin: "1em auto",
    ["box-shadow"]: "2px 2px 5px rgba(0, 0, 0, 0.3)",
    ["border-radius"]: "4px",
  },

  table: {
    ["max-width"]: "100%",
    overflow: "auto",
    ["box-shadow"]: "1px 1px 2px rgba(0, 0, 0, 0.3)",
    margin: "1em auto",
    ["border-collapse"]: "collapse",
  },

  th: {
    ["border-bottom"]: "1px solid #aaa",
  },

  ["td, th"]: {
    spacing: 0,
    padding: "0.5em 1.5em",
  },

  ["th:nth-child(2n), td:nth-child(2n)"]: {
    ["background-color"]: "var(--background-highlight)",
  },

  blockquote: {
    ["font-style"]: "italic",
    ["font-size"]: "1.1rem",
    margin: "0 1.5rem",
    ["border-left"]: "8px solid rgba(176, 176, 176, 0.3)",
    ["border-radius"]: "8px",
    padding: "0.2rem 1rem",
    overflow: "auto",
  },

  pre: {
    ["font-family"]: "monospace",
    overflow: "auto",
    padding: "0.25em",
    margin: "1em",
  },

  code: {
    padding: "0 0.25em",
  },

  a: {
    color: "var(--highlight)",
    ["text-decoration"]: "none",
    ["font-weight"]: "500",
  },

  ["a:hover"]: {
    color: "var(--hover)",
  },

  ["p ~ ul, p ~ ol"]: {
    ["margin-top"]: "-0.75em",
  },

  ["input[type='checkbox']"]: {
    appearance: "none",
  },

  ["input[type='checkbox']:before"]: {
    display: "inline-block",
    content: " ",
    margin: "auto 0.5em",
    ["border-radius"]: "5px",
    width: "1.4em",
    height: "1.4em",
    border: "0.2em solid rgba(0, 0, 0, 0.3)",
    transform: "translateY(0.4em)",
  },

  ["input[type='checkbox']:checked:before"]: {
    ["background-color"]: "rgba(0, 100, 0, 0.7)",
    ["border-color"]: "rgba(0, 100, 0, 0.7)",
    ["transform-origin"]: "bottom left",
    ["clip-path"]:
      "polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0% 43% 62%)",
  },

  [".hljs"]: {
    display: "block",
    ["overflow-x"]: "auto",
    padding: "0.5em",
    background: "#1f1f1f",
    color: "#dcdccc",

    ["box-shadow"]:
      "2px 2px 5px rgba(0, 0, 0, 0.3), inset 1px 1px 3px rgba(255, 255, 255, 0.2)",
  },

  [".hljs-literal, .hljs-keyword, .hljs-selector-tag, .hljs-tag"]: {
    color: "#feb183",
    ["font-weight"]: "bold",
  },

  [".hljs-template-tag"]: {
    color: "#dcdccc",
  },

  [".hljs-number"]: {
    color: "#7ee0de",
  },

  [".hljs-variable, .hljs-template-variable, .hljs-attribute"]: {
    color: "#feb183",
  },

  [".hljs-subst"]: {
    color: "#8f8f8f",
  },

  [".hljs-title, .hljs-name, .hljs-selector-id, .hljs-selector-class, .hljs-section, .hljs-type"]:
    {
      color: "#dcdccc",
      ["font-weight"]: "bold",
    },

  [".hljs-symbol, .hljs-bullet, .hljs-link"]: {
    color: "#dc8383",
  },

  [".hljs-built_in, .hljs-builtin-name"]: {
    color: "#e4e792",
    ["font-weight"]: "bold",
  },

  [".hljs-comment, .hljs-quote, .hljs-meta"]: {
    color: "#7f9f7f",
    ["font-style"]: "italic",
  },

  [".hljs-emphasis"]: {
    ["font-style"]: "italic",
  },

  [".hljs-strong"]: {
    ["font-weight"]: "bold",
  },

  [".hljs-addition"]: {
    color: "#00ff00",
  },

  [".hljs-deletion"]: {
    color: "#ff0000",
  },

  [".hljs-string"]: {
    color: "#dc8383",
  },

  [".katex-html"]: {
    display: "none",
  },

  ["span.icon-link::before"]: {
    content: '"¶"',
    ["margin-left"]: "-0.4em",
    ["padding-right"]: "0.4em",
    visibility: "hidden",
  },

  ["span.icon-link:hover::before"]: {
    visibility: "visible",
  },
};

type Style = typeof style;

export function to_css(style: Style, indent = 0): string {
  const space = _.range(0, indent)
    .map(() => " ")
    .join("");

  if (typeof style === "object") {
    return _(Object.entries(style))
      .map(([key, value]) => {
        if (typeof value === "object") {
          return [
            `${space}${key} {`,
            to_css(value, indent + 2),
            `${space}}`,
          ].join("\n");
        }

        return `${space}${key}: ${value};`;
      })
      .join("\n");
  }

  return style.toString();
}

export const default_css = to_css(style);
