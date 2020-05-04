import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import proxyquire from "proxyquire";
import sinon from "sinon";

import { USERS } from "#utils/const/database/tableNames";
import generateFakeUserProps from "#utils/test/generateFakeUserProps";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("findOneRecord", () => {
    it("should fetch record from table that matches search condition", async () => {
        const userProps = await generateFakeUserProps();
        const depResult = [userProps];
        const findAllRecords = sinon.stub().resolves(depResult);

        const findOneRecord = proxyquire.noPreserveCache()("./findOneRecord", {
            "./findAllRecords": {
                default: findAllRecords
            }
        }).default;

        const record = await findOneRecord(USERS, {
            name: userProps.name
        });

        expect(findAllRecords.calledOnce).to.be.true;
        expect(findOneRecord).to.be.a("function");
        expect(record).to.be.an("object");
        expect(record.createdAt).to.equal(userProps.createdAt);
        expect(record.email).to.equal(userProps.email);
        expect(record.id).to.equal(userProps.id);
        expect(record.name).to.equal(userProps.name);
        expect(record.password).to.equal(userProps.password);
        expect(record.updatedAt).to.equal(userProps.updatedAt);
    });
});
