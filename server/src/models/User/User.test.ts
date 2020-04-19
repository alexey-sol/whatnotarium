import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import faker from "faker";
import proxyquire from "proxyquire";
import sinon from "sinon";

import FormattedProps from "#types/user/FormattedProps";
import UserProps from "#types/user/UserProps";
import hashPassword from "#utils/helpers/hashPassword";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("User", async () => {
    describe("up", () => {
        it("should be a function", async () => {
            const generateSqlAndQuery = sinon.stub();

            const User = proxyquire.noPreserveCache()("./User", {
                "#utils/sql/generateSqlAndQuery": {
                    default: generateSqlAndQuery
                }
            }).default;

            await User.up();
            expect(generateSqlAndQuery.calledOnce).to.be.true;
            expect(User.up).to.be.a("function");
        });
    });

    describe("create", () => {
        it("should add a new user to DB and return a User instance", async () => {
            const userProps = await generateFakeUserProps();
            const createRecord = sinon.stub().resolves(userProps);

            const User = proxyquire.noPreserveCache()("./User", {
                "#utils/sql/Model": { createRecord }
            }).default;

            const user = await User.create({
                email: userProps.email,
                name: userProps.name,
                password: userProps.password
            });

            expect(createRecord.calledOnce).to.be.true;
            expect(User.create).to.be.a("function");
            expect(user).to.be.an("object").instanceOf(User);
            expect(user.createdAt).to.equal(userProps.createdAt);
            expect(user.email).to.equal(userProps.email);
            expect(user.id).to.equal(userProps.id);
            expect(user.name).to.equal(userProps.name);
            expect(user.password).to.equal(userProps.password);
            expect(user.updatedAt).to.equal(userProps.updatedAt);
        });
    });

    describe("destroyById", () => {
        it("should delete a user from DB and return ID of the deleted user", async () => {
            const userId = faker.random.number({ min: 1 });
            const destroyRecordById = sinon.stub().resolves(userId);

            const User = proxyquire.noPreserveCache()("./User", {
                "#utils/sql/Model": { destroyRecordById }
            }).default;

            const result = await User.destroyById(userId);
            expect(destroyRecordById.calledOnce).to.be.true;
            expect(User.destroyById).to.be.a("function");
            expect(result).to.be.a("number");
            expect(result).to.equal(userId);
        });

        it("should return null if there's no user with provided ID in DB", async () => {
            const userId = faker.random.number({ min: 1 });
            const destroyRecordById = sinon.stub().resolves(null);

            const User = proxyquire.noPreserveCache()("./User", {
                "#utils/sql/Model": { destroyRecordById }
            }).default;

            const result = await User.destroyById(userId);
            expect(destroyRecordById.calledOnce).to.be.true;
            expect(User.destroyById).to.be.a("function");
            expect(result).to.be.a("null");
        });
    });

    describe("find", () => {
        it("should fetch all users from DB", async () => {
            const userProps1 = await generateFakeUserProps();
            const userProps2 = await generateFakeUserProps();
            const userProps3 = await generateFakeUserProps();
            const allUserProps = [userProps1, userProps2, userProps3];
            const findRecords = sinon.stub().resolves(allUserProps);

            const User = proxyquire.noPreserveCache()("./User", {
                "#utils/sql/Model": { findRecords }
            }).default;

            const users = await User.find();
            expect(findRecords.calledOnce).to.be.true;
            expect(User.find).to.be.a("function");
            expect(users)
                .to.be.an("array")
                .with.length(3)
                .that.deep.include.members(allUserProps);
        });

        it("should fetch users from DB that match the search condition", async () => {
            const userProps1 = await generateFakeUserProps({ name: "Fagin" });
            const userProps2 = await generateFakeUserProps({ name: "Benjamin" });
            const userProps3 = await generateFakeUserProps({ name: "Benjamin" });
            const filteredUsers = [userProps2, userProps3];
            const findRecords = sinon.stub().resolves(filteredUsers);

            const User = proxyquire.noPreserveCache()("./User", {
                "#utils/sql/Model": { findRecords }
            }).default;

            const users = await User.find({
                name: "Benjamin"
            });

            expect(findRecords.calledOnce).to.be.true;
            expect(User.find).to.be.a("function");
            expect(users)
                .to.be.an("array")
                .with.length(2)
                .that.deep.include.members(filteredUsers)
                .that.does.not.deep.include(userProps1);
        });
    });

    describe("findOne", () => {
        it("should fetch a user from DB that matches the search condition", async () => {
            const userProps = await generateFakeUserProps();
            const findOneRecord = sinon.stub().resolves(userProps);

            const User = proxyquire.noPreserveCache()("./User", {
                "#utils/sql/Model": { findOneRecord }
            }).default;

            const user = await User.findOne({
                name: userProps.name
            });

            expect(findOneRecord.calledOnce).to.be.true;
            expect(User.findOne).to.be.a("function");
            expect(user).to.be.an("object").instanceOf(User);
            expect(user.createdAt).to.equal(userProps.createdAt);
            expect(user.email).to.equal(userProps.email);
            expect(user.id).to.equal(userProps.id);
            expect(user.name).to.equal(userProps.name);
            expect(user.password).to.equal(userProps.password);
            expect(user.updatedAt).to.equal(userProps.updatedAt);
        });
    });

    describe("save", () => {
        it("should save updated properties and return an updated user", async () => {
            const originalUserProps = await generateFakeUserProps({ name: "Pip" });
            const updatedUserProps = { ...originalUserProps, name: "Philip Pirrip" };
            const updateRecordAttributes = sinon.stub().resolves(updatedUserProps);

            const User = proxyquire.noPreserveCache()("./User", {
                "#utils/sql/Model": { updateRecordAttributes }
            }).default;

            const user = User.instantiate(originalUserProps);
            user.name = "Philip Pirrip";
            const updatedUser = await user.save();

            expect(updateRecordAttributes.calledOnce).to.be.true;
            expect(updatedUser.save).to.be.a("function");
            expect(updatedUser).to.be.an("object").instanceOf(User);
            expect(updatedUser.createdAt).to.equal(user.createdAt);
            expect(updatedUser.email).to.equal(user.email);
            expect(updatedUser.id).to.equal(user.id);
            expect(updatedUser.name).to.equal(user.name);
            expect(updatedUser.name).not.to.equal(originalUserProps.name);
            expect(updatedUser.password).to.equal(user.password);
            expect(updatedUser.updatedAt).to.equal(user.updatedAt);
        });
    });

    describe("updateAttributes", () => {
        it("should update properties and return an updated user", async () => {
            const originalUserProps = await generateFakeUserProps({ name: "Pip" });
            const updatedUserProps = { ...originalUserProps, name: "Philip Pirrip" };
            const updateRecordAttributes = sinon.stub().resolves(updatedUserProps);

            const User = proxyquire.noPreserveCache()("./User", {
                "#utils/sql/Model": { updateRecordAttributes }
            }).default;

            const user = User.instantiate(originalUserProps);
            const updatedUser = await user.updateAttributes({ name: "Philip Pirrip" });

            expect(updateRecordAttributes.calledOnce).to.be.true;
            expect(updatedUser.save).to.be.a("function");
            expect(updatedUser).to.be.an("object").instanceOf(User);
            expect(updatedUser.createdAt).to.equal(user.createdAt);
            expect(updatedUser.email).to.equal(user.email);
            expect(updatedUser.id).to.equal(user.id);
            expect(updatedUser.name).to.equal(updatedUserProps.name);
            expect(updatedUser.name).not.to.equal(user.name);
            expect(updatedUser.name).not.to.equal(originalUserProps.name);
            expect(updatedUser.password).to.equal(user.password);
            expect(updatedUser.updatedAt).to.equal(user.updatedAt);
        });
    });
});

async function generateFakeUserProps (
    options: FormattedProps = {}
): Promise<UserProps> {
    const {
        createdAt,
        email,
        id,
        name,
        password,
        updatedAt
    } = options;

    const { hash } = await hashPassword(faker.internet.password());

    return {
        createdAt: createdAt || faker.date.past(),
        email: email || faker.internet.email(),
        id: id || faker.random.number({ min: 1 }),
        name: name || faker.name.findName(),
        password: password || hash,
        updatedAt: updatedAt || faker.date.past()
    };
}
