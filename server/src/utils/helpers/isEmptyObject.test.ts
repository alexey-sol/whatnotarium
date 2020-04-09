import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import isEmptyObject from "./isEmptyObject";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("utils -> helpers -> isEmptyObject", () => {
    it("should return true if called with empty object", () => {
        const objectIsEmpty = isEmptyObject({});
        expect(objectIsEmpty).to.equal(true);
    });

    it("should return true if called with no object provided", () => {
        const objectIsEmpty = isEmptyObject();
        expect(objectIsEmpty).to.equal(true);
    });

    it("should return false if called with object having properties", () => {
        const objectIsEmpty = isEmptyObject({ a: 1 });
        expect(objectIsEmpty).to.equal(false);
    });
});
