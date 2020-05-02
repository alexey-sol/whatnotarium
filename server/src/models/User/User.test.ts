import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import faker from "faker";

import { INVALID_PROPS } from "#utils/const/validationErrors";
import { USERS } from "#utils/const/dbTableNames";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import createUser from "#utils/test/createUser";
import generateFakeUserProps from "#utils/test/generateFakeUserProps";
import resetPublicSchema from "#utils/test/resetPublicSchema";
import resetTables from "#utils/test/resetTables";
import tableExists from "#utils/test/tableExists";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("User", async () => {
    beforeEach(resetTables);

    describe("create", () => {
        it("should add new user to DB and return User instance", async () => {
            const { email, name, password } = await generateFakeUserProps();

            const user = await User.create({
                email,
                name,
                password
            });

            expect(User.create).to.be.a("function");
            expect(user).to.be.an("object").instanceOf(User);
            expect(user.createdAt).instanceof(Date);
            expect(user.email).to.equal(email);
            expect(user.id).to.be.a("number").equal(1);
            expect(user.name).to.equal(name);
            expect(user.password).to.deep.equal(password);
            expect(user.updatedAt).instanceof(Date);
        });
    });

    describe("destroyById", () => {
        it("should delete user from DB and return ID of deleted user", async () => {
            const { email, name, password } = await generateFakeUserProps();

            const user = await User.create({
                email,
                name,
                password
            });

            const result = await User.destroyById(user.id);

            expect(User.destroyById).to.be.a("function");
            expect(result).to.be.a("number").equal(user.id);
        });

        it("should return null if no user found in DB for given ID", async () => {
            const userId = faker.random.number({ min: 1 });
            const result = await User.destroyById(userId);

            expect(User.destroyById).to.be.a("function");
            expect(result).to.be.a("null");
        });
    });

    describe("findAll", () => {
        it("should fetch all users from DB", async () => {
            const user1 = await createUser();
            const user2 = await createUser();
            const user3 = await createUser();
            const expectedUsers = [user1, user2, user3];

            const result = await User.findAll();

            expect(User.findAll).to.be.a("function");
            expect(result)
                .to.be.an("array")
                .with.length(expectedUsers.length)
                .that.deep.include.members(expectedUsers);
        });

        it("should fetch users from DB that match search condition", async () => {
            const user1 = await createUser({ name: "Fagin" });
            const user2 = await createUser({ name: "Benjamin" });
            const user3 = await createUser({ name: "Benjamin" });
            const expectedUsers = [user2, user3];

            const result = await User.findAll({
                where: { name: "Benjamin" }
            });

            expect(User.findAll).to.be.a("function");
            expect(result)
                .to.be.an("array")
                .with.length(expectedUsers.length)
                .that.deep.include.members(expectedUsers)
                .that.does.not.deep.include(user1);
        });

        it("should fetch all users from DB in descending order by name", async () => {
            const user1 = await createUser({ name: "Adams" });
            const user2 = await createUser({ name: "Barley" });
            const user3 = await createUser({ name: "Duff" });
            const expectedUsers = [user3, user2, user1];

            const result = await User.findAll({
                order: "name DESC"
            });

            expect(User.findAll).to.be.a("function");
            expect(result)
                .to.be.an("array")
                .with.length(expectedUsers.length)
                .that.deep.ordered.members(expectedUsers);
        });

        it("should fetch first 2 users from DB", async () => {
            const user1 = await createUser();
            const user2 = await createUser();
            const user3 = await createUser();
            const limit = 2;
            const expectedUsers = [user1, user2];

            const result = await User.findAll({ limit });

            expect(User.findAll).to.be.a("function");
            expect(result)
                .to.be.an("array")
                .with.length(limit)
                .that.deep.include.members(expectedUsers)
                .that.does.not.deep.include(user3);
        });

        it("should skip 1st user and fetch rest users from DB", async () => {
            const user1 = await createUser();
            const user2 = await createUser();
            const user3 = await createUser();
            const offset = 1;
            const expectedUsers = [user2, user3];

            const result = await User.findAll({ offset });

            expect(User.findAll).to.be.a("function");
            expect(result)
                .to.be.an("array")
                .with.length(expectedUsers.length)
                .that.deep.include.members(expectedUsers)
                .that.does.not.deep.include(user1);
        });

        it("should skip 1st user and fetch next 2 users (but not more) matching search condition " +
        "from DB, in descending order by ID", async () => {
            await createUser({
                id: 1,
                name: "Nameless Ghoul"
            });

            const user2 = await createUser({
                id: 2,
                name: "Nameless Ghoul"
            });

            await createUser({
                id: 3,
                name: "Papa Nihil"
            });

            const user4 = await createUser({
                id: 4,
                name: "Nameless Ghoul"
            });

            await createUser({
                id: 5,
                name: "Nameless Ghoul"
            });

            const where = { name: "Nameless Ghoul" };
            const limit = 2;
            const offset = 1;
            const order = "id DESC";
            const expectedUsers = [user4, user2];

            const result = await User.findAll({
                limit,
                offset,
                order,
                where
            });

            expect(User.findAll).to.be.a("function");
            expect(result)
                .to.be.an("array")
                .with.length(expectedUsers.length)
                .that.deep.ordered.members(expectedUsers);
        });

        it("should return empty array if no users matching search condition were found in DB", async () => {
            const name = faker.name.findName();

            const result = await User.findAll({
                where: { name }
            });

            expect(User.findAll).to.be.a("function");
            expect(result).to.be.an("array").be.empty;
        });
    });

    describe("findOne", () => {
        it("should fetch user from DB that matches search condition", async () => {
            const { email, name, password } = await generateFakeUserProps();

            await User.create({
                email,
                name,
                password
            });

            const user = await User.findOne({
                where: { email }
            });

            expect(User.findOne).to.be.a("function");
            expect(user).to.be.an("object").instanceOf(User);
            expect(user!.createdAt).instanceof(Date);
            expect(user!.email).to.equal(email);
            expect(user!.id).to.be.a("number").equal(1);
            expect(user!.name).to.equal(name);
            expect(user!.password).to.deep.equal(password);
            expect(user!.updatedAt).instanceof(Date);
        });

        it("should return null if no user matching search condition was found in DB", async () => {
            const id = faker.random.number({ min: 1 });

            const result = await User.findOne({
                where: { id }
            });

            expect(User.findOne).to.be.a("function");
            expect(result).to.be.a("null");
        });
    });

    describe("formatPropsAndInstantiate", () => {
        it("should return User instance if valid user props were given", async () => {
            const props = await generateFakeUserProps();
            props.createdAt = new Date();
            props.updatedAt = new Date();

            const user = User.formatPropsAndInstantiate(props);

            expect(User.formatPropsAndInstantiate).to.be.a("function");
            expect(user).to.be.an("object").instanceOf(User);
            expect(user.createdAt).instanceof(Date);
            expect(user.email).to.equal(user.email);
            expect(user.id).to.be.a("number");
            expect(user.name).to.equal(user.name);
            expect(user.password).to.deep.equal(user.password);
            expect(user.updatedAt).instanceof(Date);
        });

        it("should throw error if invalid user props were given", async () => {
            const propsWithoutDates = await generateFakeUserProps();

            return expect(() => User.formatPropsAndInstantiate(propsWithoutDates))
                .to.throw(UserError)
                .with.property("message", INVALID_PROPS);
        });
    });

    describe("save", () => {
        it("should save updated properties and return updated User instance", async () => {
            const originalProps = await generateFakeUserProps({ name: "Pip" });
            const user = await createUser(originalProps);
            user.name = "Philip Pirrip";

            const updatedUser = await user.save();

            expect(updatedUser.save).to.be.a("function");
            expect(updatedUser).to.be.an("object").instanceOf(User);
            expect(updatedUser.createdAt).to.deep.equal(user.createdAt);
            expect(updatedUser.email).to.equal(user.email);
            expect(updatedUser.id).to.equal(user.id);
            expect(updatedUser.name).to.equal(user.name);
            expect(updatedUser.name).not.to.equal(originalProps.name);
            expect(updatedUser.password).to.deep.equal(user.password);
            expect(updatedUser.updatedAt).not.to.deep.equal(user.updatedAt);
        });
    });

    describe("up", () => {
        it(`should create table called "${USERS}" in DB`, async () => {
            await resetPublicSchema();
            const tableExistsBeforeUp = await tableExists(USERS);

            await User.up();
            const tableExistsAfterUp = await tableExists(USERS);

            expect(User.up).to.be.a("function");
            expect(tableExistsBeforeUp).to.have.property("to_regclass").equal(null);
            expect(tableExistsAfterUp).to.have.property("to_regclass").equal(USERS);
        });
    });

    describe("updateAttributes", () => {
        it("should update properties and return updated User instance", async () => {
            const originalProps = await generateFakeUserProps({ name: "Pip" });
            const user = await User.create(originalProps);

            const updatedUser = await user.updateAttributes({ name: "Philip Pirrip" });

            expect(updatedUser.save).to.be.a("function");
            expect(updatedUser).to.be.an("object").instanceOf(User);
            expect(updatedUser.createdAt).to.deep.equal(user.createdAt);
            expect(updatedUser.email).to.equal(user.email);
            expect(updatedUser.id).to.equal(user.id);
            expect(updatedUser.name).to.equal(updatedUser.name);
            expect(updatedUser.name).not.to.equal(user.name);
            expect(updatedUser.name).not.to.equal(originalProps.name);
            expect(updatedUser.password).to.deep.equal(user.password);
            expect(updatedUser.updatedAt).not.to.deep.equal(user.createdAt);
        });
    });
});
