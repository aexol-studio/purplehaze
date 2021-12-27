import React from "https://cdn.skypack.dev/react";
const Layout = ({children, routes, activeRoute, prefix = ""}) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex mx-auto h-full"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "py-10 px-20 bg-gray-100 h-full w-80"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block py-4 text-lg text-purple-900 font-black",
    href: "/"
  }, "Purple haze"), routes.map((r) => /* @__PURE__ */ React.createElement("a", {
    className: `block py-4 text-md${activeRoute === r.link ? " text-purple-900" : ""}`,
    href: `${prefix}/page/${r.link}.html`
  }, r.title))), /* @__PURE__ */ React.createElement("div", {
    className: "container mx-auto p-10 h-full overflow-auto"
  }, children));
};
export {
  Layout
};
