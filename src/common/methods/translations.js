import fr from "../../i18n/fr/translations";
import en from "../../i18n/en/translations";
import de from "../../i18n/de/translations";

export const translate = (translateKey, params = null) => {
  const language = localStorage.getItem("language") || "FR";

  let finalTranslation = "";
  const splittedKeys = translateKey.trim().split(".");
  if (splittedKeys[splittedKeys.length - 1] === "") {
    return finalTranslation;
  }

  switch (language.toLowerCase()) {
    case "en":
      if (splittedKeys.length === 1 && en[splittedKeys[0]]) {
        finalTranslation = en[splittedKeys[0]];
      }
      if (
        splittedKeys.length === 2 &&
        en[splittedKeys[0]] &&
        en[splittedKeys[0]][splittedKeys[1]]
      ) {
        finalTranslation = en[splittedKeys[0]][splittedKeys[1]];
      }
      if (
        splittedKeys.length === 3 &&
        en[splittedKeys[0]] &&
        en[splittedKeys[0]][splittedKeys[1]] &&
        en[splittedKeys[0]][splittedKeys[1]][splittedKeys[2]]
      ) {
        finalTranslation =
          en[splittedKeys[0]][splittedKeys[1]][splittedKeys[2]];
      }
      break;
    case "de":
      if (splittedKeys.length === 1 && de[splittedKeys[0]]) {
        finalTranslation = de[splittedKeys[0]];
      }
      if (
        splittedKeys.length === 2 &&
        de[splittedKeys[0]] &&
        de[splittedKeys[0]][splittedKeys[1]]
      ) {
        finalTranslation = de[splittedKeys[0]][splittedKeys[1]];
      }
      if (
        splittedKeys.length === 3 &&
        de[splittedKeys[0]] &&
        de[splittedKeys[0]][splittedKeys[1]] &&
        de[splittedKeys[0]][splittedKeys[1]][splittedKeys[2]]
      ) {
        finalTranslation =
          de[splittedKeys[0]][splittedKeys[1]][splittedKeys[2]];
      }
      break;
    case "fr":
    default:
      if (splittedKeys.length === 1 && fr[splittedKeys[0]]) {
        finalTranslation = fr[splittedKeys[0]];
      }
      if (
        splittedKeys.length === 2 &&
        fr[splittedKeys[0]] &&
        fr[splittedKeys[0]][splittedKeys[1]]
      ) {
        finalTranslation = fr[splittedKeys[0]][splittedKeys[1]];
      }
      if (
        splittedKeys.length === 3 &&
        fr[splittedKeys[0]] &&
        fr[splittedKeys[0]][splittedKeys[1]] &&
        fr[splittedKeys[0]][splittedKeys[1]][splittedKeys[2]]
      ) {
        finalTranslation =
          fr[splittedKeys[0]][splittedKeys[1]][splittedKeys[2]];
      }
      break;
  }
  if (params === null) {
    return finalTranslation;
  }
  return replaceArguments(finalTranslation, params);
};

const replaceArguments = (string, translationArguments) => {
  let translatedText = string;

  Object.keys(translationArguments).map(argument => {
    translatedText = translatedText.replace(
      `{{ ${argument} }}`,
      translationArguments[argument]
    );
    return null;
  });
  return translatedText;
};
