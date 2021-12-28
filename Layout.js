import React, {useState} from "https://cdn.skypack.dev/react";
const GithubIcon = () => /* @__PURE__ */ React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, /* @__PURE__ */ React.createElement("path", {
  d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
}));
const Layout = ({children, routes, activeRoute, prefix = ""}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex mx-auto h-full"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute sm:hidden block cursor-pointer top-6 right-6",
    onClick: () => setMobileMenuOpen(!mobileMenuOpen)
  }, /* @__PURE__ */ React.createElement("div", {
    className: "h-2 w-10 bg-purple-900 mb-2 rounded"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "h-2 w-10 bg-purple-900 mb-2 rounded"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "h-2 w-10 bg-purple-900 mb-2 rounded"
  })), mobileMenuOpen && /* @__PURE__ */ React.createElement("div", {
    className: "py-10 px-20 bg-gray-100 h-full w-80 sm:hidden block absolute top-0 left-0"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block py-4 text-lg text-purple-900 font-black",
    href: `${prefix}/`
  }, "Purple haze"), routes.map((r) => /* @__PURE__ */ React.createElement("a", {
    className: `block py-4 text-md${activeRoute === r.link ? " text-purple-900" : ""}`,
    href: `${prefix}/page/${r.link}.html`
  }, r.title))), /* @__PURE__ */ React.createElement("div", {
    className: "py-10 px-20 bg-gray-100 h-full w-80 sm:block hidden"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block py-4 text-lg text-purple-900 font-black",
    href: `${prefix}/`
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
