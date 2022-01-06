import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
const App = () => {
  return /* @__PURE__ */ React.createElement("div", null, "Hello world");
};
const hydrate = async () => ReactDOM.hydrate(/* @__PURE__ */ React.createElement(App, null), document.body);
var stdin_default = async () => {
  const renderBody = document.createElement("div");
  ReactDOM.render(/* @__PURE__ */ React.createElement(App, null), renderBody);
  return renderBody.innerHTML;
};
export {
  stdin_default as default,
  hydrate
};
