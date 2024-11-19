import Handlebars from "handlebars";

export const trancateHelper = () => {
  Handlebars.registerHelper("truncate", function(text, length) {
    if (typeof text !== "string") return text;
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  });
};