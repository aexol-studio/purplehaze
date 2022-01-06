import hljs from "https://cdn.skypack.dev/highlight.js";
import {Remarkable} from "https://cdn.skypack.dev/remarkable";
const renderMarkdown = new Remarkable({
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {
      }
    }
    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {
    }
    return "";
  }
});
export {
  renderMarkdown
};
