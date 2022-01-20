// src/index.tsx
import React from "https://cdn.skypack.dev/react";
import {htmlContent} from "./ssg/markdown.js";
import {Layout} from "./Layout/index.js";
import {routes} from "./markdownRoutes.js";
import {renderMarkdown} from "./mdtransform.js";
var src_default = (data2) => {
  return /* @__PURE__ */ React.createElement(Layout, {
    version: data2.version,
    prefix: data2.prefix,
    routes: data2.routes
  }, /* @__PURE__ */ React.createElement("div", {
    className: "prose prose-lg",
    dangerouslySetInnerHTML: {
      __html: renderMarkdown.render(data2.content.content)
    }
  }));
};
var data = () => {
  return {
    content: htmlContent["markdown/index.md"],
    routes: routes(htmlContent),
    prefix: ssg.envs.PATH_PREFIX,
    version: ssg.envs.VERSION
  };
};
var head = (data2) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("link", {
    rel: "stylesheet",
    href: "./tw.css"
  }), /* @__PURE__ */ React.createElement("title", null, "Purple haze docs ", data2.version));
};
export {
  data,
  src_default as default,
  head
};
