// pages/TestPage.tsx
import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
var App = () => {
  return /* @__PURE__ */ React.createElement("div", null, "Hello world");
};
var hydrate = async () => ReactDOM.hydrate(/* @__PURE__ */ React.createElement(App, null), document.body);
var TestPage_default = async () => {
  const renderBody = document.createElement("div");
  ReactDOM.render(/* @__PURE__ */ React.createElement(App, null), renderBody);
  return renderBody.innerHTML;
};
export {
  TestPage_default as default,
  hydrate
};
