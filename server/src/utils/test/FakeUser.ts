import faker from "faker";

import { FakeDataOnCreate, FakeDataOnUpdate } from "#types/test/user";
import FakeModel from "#types/FakeModel";
import Include from "#root/src/types/Include";
import User from "#models/User";
import hashPassword from "#utils/helpers/hashPassword";

class FakeUser implements FakeModel<User, FakeDataOnCreate> {
    constructor (
        private options: FakeDataOnUpdate = {},
        private include?: Include[]
    ) {
        this.options = options;
        this.include = include;
    }

    async populate (): Promise<FakeDataOnCreate> | never {
        const defaultHash = await hashPassword(faker.internet.password());

        const generatedOptions = {
            birthdate: this.options.birthdate || faker.date.past(),
            createdAt: this.options.createdAt,
            digest: this.options.digest || defaultHash.digest,
            email: this.options.email || faker.internet.email(),
            hasPassword: this.options.hasPassword,
            hash: this.options.hash || defaultHash.hash,
            id: this.options.id || faker.random.number({ min: 1 }),
            isAdmin: this.options.isAdmin ?? faker.random.boolean(),
            iterations: this.options.iterations || defaultHash.iterations,
            isConfirmed: this.options.isConfirmed ?? faker.random.boolean(),
            keyLength: this.options.keyLength || defaultHash.keyLength,
            lastActivityDate: this.options.lastActivityDate || faker.date.recent(),
            name: this.options.name || faker.name.findName(),
            salt: this.options.salt || defaultHash.salt,
            updatedAt: this.options.updatedAt
        };

        this.options = generatedOptions;
        return generatedOptions;
    }

    async save (): Promise<User> | never {
        const props = await this.populate();
        return User.create(props, this.include);
    }
}

export default FakeUser;
