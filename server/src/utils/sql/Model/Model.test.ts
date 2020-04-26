import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import faker from "faker";
import proxyquire from "proxyquire";
import sinon from "sinon";

import recreatePublicSchema from "#utils/test/recreatePublicSchema";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Model", async () => {
    beforeEach("drop database", recreatePublicSchema);

    describe("createRecord", () => {
        it("should create a new record", async () => {

        });
    });
});
