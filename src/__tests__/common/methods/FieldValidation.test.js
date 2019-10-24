import { configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import fieldValidation from "common/methods/FieldValidation";

configure({ adapter: new Adapter() });

describe("Testing fieldValidation method", () => {
  it("should return false when no params", () => {
    expect(fieldValidation()).toEqual(false);
  });

  it("should return false when wrong email", () => {
    expect(fieldValidation("email", "yes@tt")).toEqual(false);
  });

  it("should return false when wrong email value", () => {
    expect(fieldValidation("email", 23)).toEqual(false);
  });

  it("should return true when correct email", () => {
    expect(fieldValidation("email", "test@test.test")).toEqual(true);
  });

  it("should return false when wrong name", () => {
    expect(fieldValidation("name", "$ùrezrù%%sfps  /_")).toEqual(false);
  });

  it("should return false when wrong name value", () => {
    expect(fieldValidation("name", 23)).toEqual(false);
  });

  it("should return true when correct name", () => {
    expect(fieldValidation("name", "John Doe")).toEqual(true);
  });

  it("should return false when wrong phoneNumber", () => {
    expect(fieldValidation("phoneNumber", "0123456789")).toEqual(false);
  });

  it("should return false when wrong phoneNumber (number size)", () => {
    expect(fieldValidation("phoneNumber", "012345678")).toEqual(false);
  });

  it("should return false when wrong phoneNumber value", () => {
    expect(fieldValidation("phoneNumber", ['test', 'test2'])).toEqual(false);
  });

  it("should return true when correct phoneNumber", () => {
    expect(fieldValidation("phoneNumber", "0659874321")).toEqual(true);
  });

  it("should return false when wrong zipCode", () => {
    expect(fieldValidation("zipCode", "zipCode")).toEqual(false);
  });

  it("should return false when wrong zipCode value", () => {
    expect(fieldValidation("zipCode", ['test', 'test2'])).toEqual(false);
  });

  it("should return true when correct zipCode", () => {
    expect(fieldValidation("zipCode", "75004")).toEqual(true);
  });
});
