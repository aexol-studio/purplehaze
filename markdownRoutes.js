const routes = (htmlContent2) => Object.entries(htmlContent2).filter(([, v]) => !!v.data.title).map(([k, v]) => ({
  ...v.data
})).sort((a, b) => ("order" in a ? a.order : 0) > ("order" in b ? b.order : 0) ? 1 : -1);
export {
  routes
};
