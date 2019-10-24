import { configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import { setMomentGlobalLang } from "common/methods/momentGlobals";
import moment from "moment";

configure({ adapter: new Adapter() });

describe("Testing momentGlobals method", () => {
  it("should return 'en' when no params", () => {
    setMomentGlobalLang();
    expect(moment.locale()).toEqual("en");
  });

  it("should return en when wrong params", () => {
      setMomentGlobalLang("frdsfdss");
      expect(moment.locale()).toEqual("en");
  });

  it("should return 'fr' when passed 'fr'", () => {
    setMomentGlobalLang("fr");
    expect(moment.locale()).toEqual("fr");
  });
});
