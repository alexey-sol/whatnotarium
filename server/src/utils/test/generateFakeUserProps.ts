import faker from "faker";

import { FakeDataOnCreate, FakeDataOnUpdate } from "#types/test/user";
import hashPassword from "#utils/helpers/hashPassword";

async function generateFakeUserProps (
    options: FakeDataOnUpdate = {}
): Promise<FakeDataOnCreate> {
    const defaultHash = await hashPassword(faker.internet.password());

    return {
        birthdate: options.birthdate || faker.date.past(),
        createdAt: options.createdAt,
        digest: options.digest || defaultHash.digest,
        email: options.email || faker.internet.email(),
        hasPassword: options.hasPassword,
        hash: options.hash || defaultHash.hash,
        id: options.id || faker.random.number({ min: 1 }),
        isAdmin: options.isAdmin || faker.random.boolean(),
        iterations: options.iterations || defaultHash.iterations,
        isConfirmed: options.isConfirmed || faker.random.boolean(),
        keyLength: options.keyLength || defaultHash.keyLength,
        lastActivityDate: options.lastActivityDate || faker.date.recent(),
        name: options.name || faker.name.findName(),
        salt: options.salt || defaultHash.salt,
        updatedAt: options.updatedAt
    };
}

export default generateFakeUserProps;
