import { HASH_OPTIONS, PROFILES } from "#utils/const/database/tableNames";
import FakePost from "#utils/test/FakePost";
import FakeUser from "#utils/test/FakeUser";
import Post from "#models/Post";
import User from "#models/User";
import getRandomIntFromRange from "#utils/helpers/getRandomIntFromRange";
import shuffleArray from "#utils/helpers/shuffleArray";

const DEFAULT_USER_COUNT = 500;
const DEFAULT_POSTS_PER_USER_RANGE = [0, 20];

const userCount = parseInt(process.argv[2], 10) || DEFAULT_USER_COUNT;
const postsPerUserRange = process.argv[3]
    ? JSON.parse(process.argv[3])
    : DEFAULT_POSTS_PER_USER_RANGE;

const generateUsers = (count: number): Promise<User[]> | never => {
    const includeProfile = {
        as: "profile",
        attributes: ["about", "birthdate", "lastActivityDate", "name", "picture", "totalVoteCount"],
        referencedKey: "userId",
        ownKey: "id",
        tableName: PROFILES
    };

    const includeHashOptions = {
        as: "hashOptions",
        attributes: ["digest", "hash", "iterations", "keyLength", "salt"],
        referencedKey: "userId",
        ownKey: "id",
        tableName: HASH_OPTIONS
    };

    const promises: Promise<User>[] = [];

    for (let i = 0; i < count; i += 1) {
        promises.push(new FakeUser(
            { isAdmin: false, isConfirmed: true },
            [includeProfile, includeHashOptions]
        ).save());
    }

    return Promise.all(promises);
};

const generatePosts = (users: User[], postsRange: [number, number]): Promise<Post[]> | never => {
    const delayedSaves: Function[] = [];

    users.forEach(user => {
        const postCount = getRandomIntFromRange(postsRange);

        for (let i = 0; i < postCount; i += 1) {
            delayedSaves.push(() => new FakePost(
                { isApproved: true, isFrozen: false, userId: user.id }
            ).save());
        }
    });

    const shuffledSaves = shuffleArray(delayedSaves);
    const promises = shuffledSaves.map((save: any) => save());
    return Promise.all(promises);
};

const main = async (): Promise<void> | never => {
    const users = await generateUsers(userCount);
    await generatePosts(users, postsPerUserRange);
};

main().catch(console.error);
