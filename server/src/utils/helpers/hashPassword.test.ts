import { randomBytes } from "crypto";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import HashPasswordResult from "#types/HashPasswordResult";
import hashPassword from "./hashPassword";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("utils -> helpers -> hashPassword", () => {
    const password = "qwerty";

    it("should return valid result object for given full options", async () => {
        const fullOptions = {
            digest: "sha512",
            iterations: 1000,
            keyLength: 16,
            salt: randomBytes(128).toString("base64")
        };

        const result = await hashPassword(password, fullOptions);
        isValidResultObject(result);
    });

    it("should return valid result object for given partial options", async () => {
        const partialOptions = { keyLength: 16 };
        const result = await hashPassword(password, partialOptions);
        isValidResultObject(result);
    });

    it("should return a valid result object if called with no options", async () => {
        const result: HashPasswordResult = await hashPassword(password);
        isValidResultObject(result);
    });

    it("should throw error for given invalid option", async () => {
        const options = { keyLength: -1 };

        return expect(hashPassword(password, options))
            .to.be.eventually.rejectedWith(Error)
            .and.have.property("name", "RangeError");
    });
});

function isValidResultObject (result: HashPasswordResult): void {
    expect(result).to.be.a("object");
    expect(result).to.have.property("digest").be.a("string").not.be.empty;
    expect(result).to.have.property("iterations").be.a("number");
    expect(result).to.have.property("keyLength").be.a("number");
    expect(result).to.have.property("salt").be.a("string").not.be.empty;
    expect(result).to.have.property("hash").be.instanceof(Buffer);
}
