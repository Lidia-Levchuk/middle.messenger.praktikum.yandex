import Handlebars from "handlebars";

export const notHelper = () => {
  Handlebars.registerHelper("not", function (value) {
    return !value;
  });
};