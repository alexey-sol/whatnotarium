import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import proxyquire from "proxyquire";
import sinon from "sinon";

import { USERS } from "#utils/const/dbTableNames";
import generateFakeUserProps from "#utils/test/generateFakeUserProps";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("updateRecordAttributes", () => {
    it("should update the record and return it", async () => {
        const originalProps = await generateFakeUserProps({ name: "Pip" });
        const updatedProps = { ...originalProps, name: "Philip Pirrip" };
        const records = [updatedProps];
        const generateSqlAndQuery = sinon.stub().resolves(records);

        const updateRecordAttributes = proxyquire.noPreserveCache()("./updateRecordAttributes", {
            "#utils/sql/generateSqlAndQuery": {
                default: generateSqlAndQuery
            }
        }).default;

        const updatedRecord = await updateRecordAttributes(USERS, { name: "Philip Pirrip" });

        expect(generateSqlAndQuery.calledOnce).to.be.true;
        expect(updateRecordAttributes).to.be.a("function");
        expect(updatedRecord).to.be.an("object");
        expect(updatedRecord.createdAt).to.equal(originalProps.createdAt);
        expect(updatedRecord.email).to.equal(originalProps.email);
        expect(updatedRecord.id).to.equal(originalProps.id);
        expect(updatedRecord.name).to.equal(updatedProps.name);
        expect(updatedRecord.name).not.to.equal(originalProps.name);
        expect(updatedRecord.name).not.to.equal(originalProps.name);
        expect(updatedRecord.password).to.equal(originalProps.password);
        expect(updatedRecord.updatedAt).to.equal(originalProps.updatedAt);
    });
});
