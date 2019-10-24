/**
 * Function takes date object and
 * returns {Object} with weekday in words(if needed), numeric day(if needed),
 * month in words(using provided language) and numeric year.
 *
 *
 * @param language `string` Language ISO2 code in which date will be returned
 * @param includeDay boolean True if date should include day
 * @param includeWeekday boolean True if date should include weekday
 * @param date {Object} Date
 * @returns {Object}
 */
const getLocalDateRepresentation = (
  language,
  includeDay = false,
  includeWeekday = false,
  date = new Date()
) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const todayInLocale = date
    .toLocaleDateString(language, options)
    .replace(/\.|,/g, "")
    .split(" ");
  // English locale has month before day.
  if (language === "en") {
    const day = todayInLocale[2];
    todayInLocale[2] = todayInLocale[1];
    todayInLocale[1] = day;
  }
  const dateObj = { month: todayInLocale[2], year: todayInLocale[3] };
  if (includeDay) dateObj.day = todayInLocale[1];
  if (includeWeekday)
    dateObj.weekday =
      todayInLocale[0].charAt(0).toUpperCase() + todayInLocale[0].slice(1);

  return dateObj;
};

export default getLocalDateRepresentation;
