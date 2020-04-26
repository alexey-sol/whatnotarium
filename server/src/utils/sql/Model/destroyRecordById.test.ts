import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import faker from "faker";
import proxyquire from "proxyquire";
import sinon from "sinon";

import { USERS } from "#utils/const/dbTableNames";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("destroyRecordById", () => {
    it("should delete a record from DB and return its ID", async () => {
        const userId = faker.random.number({ min: 1 });
        const records = [{ id: userId }];
        const generateSqlAndQuery = sinon.stub().resolves(records);

        const destroyRecordById = proxyquire.noPreserveCache()("./destroyRecordById", {
            "#utils/sql/generateSqlAndQuery": {
                default: generateSqlAndQuery
            }
        }).default;

        const result = await destroyRecordById(USERS, userId);

        expect(generateSqlAndQuery.calledOnce).to.be.true;
        expect(destroyRecordById).to.be.a("function");
        expect(result).to.be.a("number").equal(userId);
    });

    it("should return null if there's no record with the given ID in DB", async () => {
        const userId = faker.random.number({ min: 1 });
        const generateSqlAndQuery = sinon.stub().resolves([]);

        const destroyRecordById = proxyquire.noPreserveCache()("./destroyRecordById", {
            "#utils/sql/generateSqlAndQuery": {
                default: generateSqlAndQuery
            }
        }).default;

        const result = await destroyRecordById(USERS, userId);

        expect(generateSqlAndQuery.calledOnce).to.be.true;
        expect(destroyRecordById).to.be.a("function");
        expect(result).to.be.a("null");
    });
});
