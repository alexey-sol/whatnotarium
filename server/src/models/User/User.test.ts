import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import faker from "faker";

import { FakeDataOnCreate } from "#root/src/types/test/user";
import { HASH_OPTIONS, PROFILES, USERS } from "#utils/const/database/tableNames";
import { INVALID_PROPS } from "#utils/const/validationErrors";
import Attributes from "#root/src/types/user/Attributes";
import FakeUser from "#utils/test/FakeUser";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import resetSchema from "#utils/test/resetSchema";
import resetTables from "#utils/test/resetTables";
import tableExists from "#utils/test/tableExists";

chai.use(chaiAsPromised);
const { expect } = chai;

function expectUserToBeOk (user: User | null, props: FakeDataOnCreate): void {
    expect(User.create).to.be.a("function");
    expect(user).to.be.an("object").instanceOf(User);
    expect(user?.id).to.be.a("number").equal(props.id);
    expect(user?.email).to.equal(props.email);
    expect(user?.createdAt).instanceof(Date);
    expect(user?.updatedAt).instanceof(Date);
    expect(user?.isConfirmed).to.be.a("boolean").equal(props.isConfirmed);
}

const includeFullProfile = {
    as: "profile",
    attributes: ["about", "birthdate", "lastActivityDate", "name", "picture", "totalVoteCount"],
    referencedKey: "userId",
    ownKey: "id",
    tableName: PROFILES
};

const includePartialProfile = {
    as: "profile",
    attributes: ["name", "picture"],
    referencedKey: "userId",
    ownKey: "id",
    tableName: PROFILES
};

const includeFullHashOptions = {
    as: "hashOptions",
    attributes: ["digest", "hash", "iterations", "keyLength", "salt"],
    referencedKey: "userId",
    ownKey: "id",
    tableName: HASH_OPTIONS
};

describe("User", async () => {
    beforeEach(() => resetTables());

    describe("create", () => {
        it("should add new user to DB and return User instance", async () => {
            const props = await new FakeUser({ id: 1 }).populate();
            const user = await User.create(props);

            expectUserToBeOk(user, props);
        });

        it("should add new user to DB and return User instance with included Profile", async () => {
            const props = await new FakeUser({ id: 1 }).populate();
            const user = await User.create(props, [includeFullProfile]);

            expectUserToBeOk(user, props);

            expect(user.profile).to.be.an("object");
            expect(user.profile).to.have.property("about").be.a("string").empty;
            expect(user.profile).to.have.property("name").equal(props.name);
            expect(user.profile).to.have.property("picture").be.null;
            expect(user.profile).to.have.property("totalVoteCount").equal(0);
        });

        it("should add new user to DB and return User instance with included partial Profile and " +
        "full HashOptions", async () => {
            const props = await new FakeUser({ id: 1 }).populate();
            const user = await User.create(props, [includePartialProfile, includeFullHashOptions]);

            expectUserToBeOk(user, props);

            expect(user.profile).to.be.an("object");
            expect(user.profile).to.have.property("name").equal(props.name);
            expect(user.profile).to.have.property("picture").be.null;
            expect(user.profile).to.not.have.property("about");
            expect(user.profile).to.not.have.property("totalVoteCount");

            expect(user.hashOptions).to.be.an("object");
            expect(user.hashOptions).to.have.property("digest").equal(props.digest);
            expect(user.hashOptions).to.have.property("hash").deep.equal(props.hash);
            expect(user.hashOptions).to.have.property("iterations").equal(props.iterations);
            expect(user.hashOptions).to.have.property("keyLength").equal(props.keyLength);
            expect(user.hashOptions).to.have.property("salt").equal(props.salt);
        });
    });

    describe("destroyById", () => {
        it("should delete user from DB and return ID of deleted user", async () => {
            const props = await new FakeUser().populate();
            const user = await User.create(props);
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
            const user1 = await new FakeUser().save();
            const user2 = await new FakeUser().save();
            const user3 = await new FakeUser().save();

            const expectedUsers = [user1, user2, user3];
            const result = await User.findAll();

            expect(User.findAll).to.be.a("function");
            expect(result)
                .to.be.an("array")
                .with.length(expectedUsers.length)
                .that.deep.include.members(expectedUsers);
        });

        it("should fetch users from DB that match where filter", async () => {
            const user1 = await new FakeUser({ name: "Fagin" }, [includePartialProfile]).save();
            const user2 = await new FakeUser({ name: "Benjamin" }, [includePartialProfile]).save();
            const user3 = await new FakeUser({ name: "Benjamin" }, [includePartialProfile]).save();

            const expectedUsers = [user2, user3];

            const result = await User.findAll({
                include: [includePartialProfile],
                where: { name: "Benjamin" } as Attributes
            });

            expect(User.findAll).to.be.a("function");
            expect(result)
                .to.be.an("array")
                .with.length(expectedUsers.length)
                .that.deep.include.members(expectedUsers)
                .that.does.not.deep.include(user1);
        });

        it("should fetch all users from DB in descending order by name", async () => {
            const user1 = await new FakeUser({ name: "Adams" }, [includePartialProfile]).save();
            const user2 = await new FakeUser({ name: "Duff" }, [includePartialProfile]).save();
            const user3 = await new FakeUser({ name: "Barley" }, [includePartialProfile]).save();

            const expectedUsers = [user2, user3, user1];

            const result = await User.findAll({
                include: [includePartialProfile],
                order: `${PROFILES}.name DESC`
            });

            expect(User.findAll).to.be.a("function");
            expect(result)
                .to.be.an("array")
                .with.length(expectedUsers.length)
                .that.deep.ordered.members(expectedUsers);
        });

        it("should fetch first 2 users from DB", async () => {
            const user1 = await new FakeUser().save();
            const user2 = await new FakeUser().save();
            const user3 = await new FakeUser().save();

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
            const user1 = await new FakeUser().save();
            const user2 = await new FakeUser().save();
            const user3 = await new FakeUser().save();

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

        it("should skip 1st users and fetch next 2 users (but not more) matching where filter " +
        "from DB, in descending order by ID", async () => {
            await new FakeUser({
                id: 1,
                name: "Nameless Ghoul"
            }, [includePartialProfile]).save();

            const user2 = await new FakeUser({
                id: 2,
                name: "Nameless Ghoul"
            }, [includePartialProfile]).save();

            await new FakeUser({
                id: 3,
                name: "Papa Nihil"
            }, [includePartialProfile]).save();

            const user4 = await new FakeUser({
                id: 4,
                name: "Nameless Ghoul"
            }, [includePartialProfile]).save();

            await new FakeUser({
                id: 5,
                name: "Nameless Ghoul"
            }, [includePartialProfile]).save();

            const where = { name: "Nameless Ghoul" } as Attributes;
            const limit = 2;
            const offset = 1;
            const order = "id DESC";
            const expectedUsers = [user4, user2];

            const result = await User.findAll({
                include: [includePartialProfile],
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

        it("should return empty array if no users matching where filter were found in DB", async () => {
            const name = faker.name.findName();

            const result = await User.findAll({
                include: [includePartialProfile],
                where: { name } as Attributes
            });

            expect(User.findAll).to.be.a("function");
            expect(result).to.be.an("array").be.empty;
        });
    });

    describe("findOne", () => {
        it("should fetch user from DB that matches where filter", async () => {
            const props = await new FakeUser({ id: 1 }).populate();
            await User.create(props);

            const user = await User.findOne({
                where: { email: props.email }
            });

            expectUserToBeOk(user, props);
        });

        it("should return null if no user matching where filter was found in DB", async () => {
            const id = faker.random.number({ min: 1 });

            const result = await User.findOne({
                where: { id }
            });

            expect(User.findOne).to.be.a("function");
            expect(result).to.be.a("null");
        });
    });

    describe("formatPropsAndInstantiate", () => {
        it("should return User instance if valid users props were given", async () => {
            const props = await new FakeUser({
                createdAt: new Date(),
                id: 1,
                hasPassword: true,
                updatedAt: new Date()
            }).populate();

            const user = User.formatPropsAndInstantiate(props);

            expectUserToBeOk(user, props);
        });

        it("should throw error if invalid users props were given", async () => {
            const propsWithoutDates = await new FakeUser().populate();

            return expect(() => User.formatPropsAndInstantiate(propsWithoutDates))
                .to.throw(UserError)
                .with.property("message", INVALID_PROPS);
        });
    });

    describe("up", () => {
        it(`should create table called "${USERS}" in DB`, async () => {
            await resetSchema();
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
            const originalProps = await new FakeUser({ id: 1, name: "Pip" }).populate();
            const user = await User.create(originalProps, [includePartialProfile]);

            const newName = "Philip Pirrip";
            const updatedUser = await user.updateAttributes({ name: newName }, [includePartialProfile]);

            expectUserToBeOk(updatedUser, {
                ...originalProps,
                name: newName
            });

            expect(User.create).to.be.a("function");
            expect(updatedUser).to.be.an("object").instanceOf(User);
            expect(updatedUser.id).to.be.a("number").equal(user.id);
            expect(updatedUser.email).to.equal(user.email);
            expect(updatedUser.isConfirmed).to.be.a("boolean").equal(user.isConfirmed);
            expect(updatedUser.profile?.name).to.be.a("string").equal(newName);
            expect(updatedUser.profile?.name).to.not.equal(user.profile?.name);
            expect(updatedUser.createdAt).instanceof(Date).to.deep.equal(user.createdAt);
        });
    });
});
