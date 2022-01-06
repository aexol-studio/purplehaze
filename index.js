import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
import {htmlContent} from "./ssg/markdown.js";
import {Layout} from "./Layout.js";
import {routes} from "./markdownRoutes.js";
import {renderMarkdown} from "./mdtransform.js";
const IndexPage = ({data: data2}) => {
  return /* @__PURE__ */ React.createElement(Layout, {
    prefix: data2.prefix,
    routes: data2.routes
  }, /* @__PURE__ */ React.createElement("div", {
    className: "prose prose-lg",
    dangerouslySetInnerHTML: {
      __html: renderMarkdown.render(data2.content.content)
    }
  }));
};
const data = () => {
  return {
    content: htmlContent["markdown/index.md"],
    routes: routes(htmlContent),
    prefix: ssg.envs.PATH_PREFIX
  };
};
const head = () => {
  return `
    <link rel="stylesheet" href="./tw.css" />
    <title>Purple haze docs</title>
  `;
};
const hydrate = async (staticData) => ReactDOM.hydrate(/* @__PURE__ */ React.createElement(IndexPage, {
  data: staticData
}), document.body);
var stdin_default = async (staticData) => {
  const renderBody = document.createElement("div");
  ReactDOM.render(/* @__PURE__ */ React.createElement(IndexPage, {
    data: staticData
  }), renderBody);
  return renderBody.innerHTML;
};
export {
  data,
  stdin_default as default,
  head,
  hydrate
};
