import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import proxyquire from "proxyquire";
import sinon from "sinon";

import { USERS } from "#utils/const/dbTableNames";
import generateFakeUserProps from "#utils/test/generateFakeUserProps";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("findAllRecords", () => {
    it("should fetch all records from table", async () => {
        const userProps1 = await generateFakeUserProps();
        const userProps2 = await generateFakeUserProps();
        const userProps3 = await generateFakeUserProps();
        const allRecords = [userProps1, userProps2, userProps3];
        const generateSqlAndQuery = sinon.stub().resolves(allRecords);

        const findAllRecords = proxyquire.noPreserveCache()("./findAllRecords", {
            "#utils/sql/generateSqlAndQuery": {
                default: generateSqlAndQuery
            }
        }).default;

        const users = await findAllRecords(USERS);

        expect(generateSqlAndQuery.calledOnce).to.be.true;
        expect(findAllRecords).to.be.a("function");
        expect(users)
            .to.be.an("array")
            .with.length(allRecords.length)
            .that.deep.include.members(allRecords);
    });

    it("should fetch records from table that match search condition", async () => {
        const userProps1 = await generateFakeUserProps({ name: "Fagin" });
        const userProps2 = await generateFakeUserProps({ name: "Benjamin" });
        const userProps3 = await generateFakeUserProps({ name: "Benjamin" });
        const filteredRecords = [userProps2, userProps3];
        const generateSqlAndQuery = sinon.stub().resolves(filteredRecords);

        const findAllRecords = proxyquire.noPreserveCache()("./findAllRecords", {
            "#utils/sql/generateSqlAndQuery": {
                default: generateSqlAndQuery
            }
        }).default;

        const users = await findAllRecords(USERS, {
            name: "Benjamin"
        });

        expect(generateSqlAndQuery.calledOnce).to.be.true;
        expect(findAllRecords).to.be.a("function");
        expect(users)
            .to.be.an("array")
            .with.length(filteredRecords.length)
            .that.deep.include.members(filteredRecords)
            .that.does.not.deep.include(userProps1);
    });
});
