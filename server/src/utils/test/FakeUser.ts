import faker from "faker";

import { FakeDataOnCreate, FakeDataOnUpdate } from "#types/test/user";
import { IMAGE_EXT } from "#utils/const/defaultValues";
import Download from "#utils/http/Download";
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

    static async downloadPicture (url: string): Promise<Buffer | undefined> {
        let picture;

        try {
            picture = await new Download(url, { fileExt: IMAGE_EXT }).getFile();
        } finally {
            return picture; // eslint-disable-line
        }
    }

    async populate (): Promise<FakeDataOnCreate> | never {
        const defaultHash = await hashPassword(faker.internet.password());
        const pictureUrl = faker.image.imageUrl(100, 100);

        const generatedOptions = {
            birthdate: this.options.birthdate || faker.date.past(),
            createdAt: this.options.createdAt,
            digest: this.options.digest || defaultHash.digest,
            email: this.options.email || faker.internet.email(),
            hasPassword: this.options.hasPassword,
            hash: this.options.hash || defaultHash.hash,
            id: this.options.id,
            isAdmin: this.options.isAdmin ?? faker.random.boolean(),
            isConfirmed: this.options.isConfirmed ?? faker.random.boolean(),
            iterations: this.options.iterations || defaultHash.iterations,
            keyLength: this.options.keyLength || defaultHash.keyLength,
            lastActivityDate: this.options.lastActivityDate || faker.date.recent(),
            name: this.options.name || faker.name.findName(),
            picture: this.options.picture || await FakeUser.downloadPicture(pictureUrl),
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
