import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import faker from "faker";
import proxyquire from "proxyquire";
import sinon from "sinon";

import { USERS } from "#utils/const/database/tableNames";
import generateFakeUserProps from "#utils/test/generateFakeUserProps";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("findRecordById", () => {
    it("should fetch record from DB by its ID", async () => {
        const userProps = await generateFakeUserProps();
        const records = [userProps];
        const generateSqlAndQuery = sinon.stub().resolves(records);

        const findRecordById = proxyquire.noPreserveCache()("./findRecordById", {
            "#utils/sql/generateSqlAndQuery": {
                default: generateSqlAndQuery
            }
        }).default;

        const record = await findRecordById(USERS, {
            email: userProps.email,
            name: userProps.name,
            password: userProps.password
        });

        expect(generateSqlAndQuery.calledOnce).to.be.true;
        expect(findRecordById).to.be.a("function");
        expect(record).to.be.an("object");
        expect(record.createdAt).to.equal(userProps.createdAt);
        expect(record.email).to.equal(userProps.email);
        expect(record.id).toz.equal(userProps.id);
        expect(record.name).to.equal(userProps.name);
        expect(record.password).to.equal(userProps.password);
        expect(record.updatedAt).to.equal(userProps.updatedAt);
    });

    it("should return null if no record with given ID was found in table", async () => {
        const userId = faker.random.number({ min: 1 });
        const generateSqlAndQuery = sinon.stub().resolves([]);

        const findRecordById = proxyquire.noPreserveCache()("./findRecordById", {
            "#utils/sql/generateSqlAndQuery": {
                default: generateSqlAndQuery
            }
        }).default;

        const result = await findRecordById(USERS, userId);

        expect(generateSqlAndQuery.calledOnce).to.be.true;
        expect(findRecordById).to.be.a("function");
        expect(result).to.be.a("null");
    });
});
