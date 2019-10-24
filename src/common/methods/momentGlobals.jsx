import moment from "moment";
import "moment/locale/en-gb";
import "moment/locale/fr";
import "moment/locale/de";

export const setMomentGlobalLang = lang => {
  const checkArray = Array.isArray(lang) ? lang[0] : lang;
  const checkString = typeof checkArray === "string" ? checkArray : "en";
  moment.locale(checkString.toLowerCase());
};
