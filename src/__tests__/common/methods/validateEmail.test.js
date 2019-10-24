import { configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import validateEmail from "common/methods/ValidateEmail";

configure({ adapter: new Adapter() });

describe("Testing validateEmail method", () => {
    it("should return false when no params", () => {
        expect(validateEmail()).toEqual(false);
    });

    it("should return false when wrong params", () => {
        expect(validateEmail("john@doe")).toEqual(false);
    });

    it("should return false when wrong params type", () => {
        expect(validateEmail([26,52])).toEqual(false);
    });

    it("should return true when correct params", () => {
        expect(validateEmail("john@doe.com")).toEqual(true);
    });
});
