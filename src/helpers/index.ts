import { formatDateTimeHelper } from "./formatDateTimeHelper";
import { isEqualHelper } from "./isEqualHelper";
import { notHelper } from "./notHelper";
import { orHelper } from "./orHelper";
import { trancateHelper } from "./trancateHelper";

export const registerHelpers = () => {
  formatDateTimeHelper();
  isEqualHelper();
  notHelper();
  orHelper();
  trancateHelper();
};