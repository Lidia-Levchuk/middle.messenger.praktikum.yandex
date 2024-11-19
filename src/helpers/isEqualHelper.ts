import Handlebars from "handlebars";

export const isEqualHelper = () => {
  Handlebars.registerHelper("isEqual", (param1, param2) => {
    return param1 === param2 ? true : false;
  });
};