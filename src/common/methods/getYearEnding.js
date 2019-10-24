/**
 * Returns plural or single form of `year` word for translator.
 *
 * @returns string
 */
const getYearEnding = number => {
  return number === 1 || number === "1" ? "year" : "years";
};

export default getYearEnding;
