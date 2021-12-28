const routes = (htmlContent2) => Object.entries(htmlContent2).filter(([, v]) => !!v.data.title).map(([k, v]) => ({
  link: v.data.link,
  title: v.data.title
}));
export {
  routes
};
