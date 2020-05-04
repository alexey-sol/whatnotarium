import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import proxyquire from "proxyquire";
import sinon from "sinon";

import { USERS } from "#utils/const/database/tableNames";
import generateFakeUserProps from "#utils/test/generateFakeUserProps";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("createRecord", () => {
    it("should add new record to table and return it", async () => {
        const userProps = await generateFakeUserProps();
        const records = [userProps];
        const generateSqlAndQuery = sinon.stub().resolves(records);

        const createRecord = proxyquire.noPreserveCache()("./createRecord", {
            "#utils/sql/generateSqlAndQuery": {
                default: generateSqlAndQuery
            }
        }).default;

        const record = await createRecord(USERS, {
            email: userProps.email,
            name: userProps.name,
            password: userProps.password
        });

        expect(generateSqlAndQuery.calledOnce).to.be.true;
        expect(createRecord).to.be.a("function");
        expect(record).to.be.an("object");
        expect(record.createdAt).to.equal(userProps.createdAt);
        expect(record.email).to.equal(userProps.email);
        expect(record.id).to.equal(userProps.id);
        expect(record.name).to.equal(userProps.name);
        expect(record.password).to.equal(userProps.password);
        expect(record.updatedAt).to.equal(userProps.updatedAt);
    });
});
