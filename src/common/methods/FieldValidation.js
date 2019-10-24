import validator from "validator";
const fieldValidation = (testName, value) => {
  const phoneNumberRegex = /^(?!0123456789|0000000000|1111111111|2222222222|3333333333|0102030405|0600000000)((\+)33|(\+)41|0)[1-9](\d{2}){4}$/;
  const nameRegex = /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ ]+[- ]*[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/;
  const emailRegex = /^(?=.{1,254}$)(?=.{1,64}@)([-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@(?!lottner\.[a-zA-Z0-9]{0,})(?!lopatex\.[a-zA-Z0-9]{0,})(?!dataex4000\.[a-zA-Z0-9]{0,})(?!emueller\.[a-zA-Z0-9]{0,})(?!gemica\.[a-zA-Z0-9]{0,})(?!reisswolf\.[a-zA-Z0-9]{0,})(?!lottner-rohstoffe\.[a-zA-Z0-9]{0,})(?!paprec\.[a-zA-Z0-9]{0,})(?!coved\.[a-zA-Z0-9]{0,})[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+)*$/i;

  switch (testName) {
    case "email":
      return emailRegex.test(String(value).toLowerCase());
    case "name":
      return nameRegex.test(String(value));
    case "phoneNumber":
      return phoneNumberRegex.test(String(value));
    case "zipCode":
      return validator.isPostalCode(String(value), "FR");
    default:
      return false;
  }
};
export default fieldValidation;
