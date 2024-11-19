import Handlebars from "handlebars";

export const orHelper = () => {
  Handlebars.registerHelper("or", (arg1: any, arg2: any) => {
    return arg1 || arg2;
  });
};
