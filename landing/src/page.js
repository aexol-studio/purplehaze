import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
import {md} from "./ssg/md.js";
import {htmlContent} from "./ssg/markdown.js";
import {Layout} from "./Layout.js";
import {routes} from "./markdownRoutes.js";
import {html} from "./ssg/basic.js";
const CustomPage = ({data: data2}) => {
  return /* @__PURE__ */ React.createElement(Layout, {
    prefix: data2.prefix,
    activeRoute: data2.activeRoute,
    routes: data2.routes
  }, /* @__PURE__ */ React.createElement("div", {
    className: "prose",
    dangerouslySetInnerHTML: {__html: md`${data2.content.content}`}
  }));
};
const data = () => {
  return {
    htmlContent,
    routes: routes(htmlContent),
    prefix: ssg.envs.PATH_PREFIX
  };
};
const hydrate = async (staticData) => ReactDOM.hydrate(/* @__PURE__ */ React.createElement(CustomPage, {
  data: staticData
}), document.body);
const pages = async (staticData) => {
  return Object.entries(staticData.htmlContent).filter(([, v]) => !!v.data.link).map(([k, v], i) => {
    const renderBody = document.createElement("div");
    ReactDOM.render(/* @__PURE__ */ React.createElement(CustomPage, {
      data: {
        content: v,
        routes: routes(staticData.htmlContent),
        activeRoute: v.data.link,
        prefix: staticData.prefix
      }
    }), renderBody);
    return {
      body: renderBody.innerHTML,
      data: {
        content: v,
        routes: routes(staticData.htmlContent),
        activeRoute: v.data.link,
        prefix: staticData.prefix
      },
      slug: v.data.link,
      head: html`
          <link rel="stylesheet" href="../tw.css" />
          <title>Purple haze docs</title>
        `
    };
  });
};
export {
  data,
  hydrate,
  pages
};
