import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import isEmptyObject from "./isEmptyObject";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("utils -> helpers -> isEmptyObject", () => {
    it("should return true for given empty object", () => {
        const objectIsEmpty = isEmptyObject({});
        expect(objectIsEmpty).to.equal(true);
    });

    it("should return true if called with no argument", () => {
        const objectIsEmpty = isEmptyObject();
        expect(objectIsEmpty).to.equal(true);
    });

    it("should return false for given object with properties", () => {
        const objectIsEmpty = isEmptyObject({ a: 1 });
        expect(objectIsEmpty).to.equal(false);
    });
});
