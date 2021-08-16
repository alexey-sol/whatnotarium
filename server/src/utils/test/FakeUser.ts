import faker from "faker";

import { FakeDataOnCreate, FakeDataOnUpdate } from "#types/test/user";
import { IMAGE_EXT } from "#utils/const/defaultValues";
import Download from "#utils/http/Download";
import FakeModel from "#types/FakeModel";
import Include from "#root/src/types/Include";
import User from "#models/User";
import hashPassword from "#utils/helpers/hashPassword";

interface Options {
    shouldDownloadUserPictures?: boolean;
}

class FakeUser implements FakeModel<User, FakeDataOnCreate> {
    constructor (
        private props: FakeDataOnUpdate = {},
        private include?: Include[],
        private options?: Options
    ) {
        this.props = props;
        this.include = include;
        this.options = options;
    }

    async populate (): Promise<FakeDataOnCreate> | never {
        const defaultHash = await hashPassword(faker.internet.password());
        const pictureUrl = faker.image.imageUrl(100, 100);

        const generatedProps = {
            birthdate: this.props.birthdate || faker.date.past(),
            createdAt: this.props.createdAt,
            digest: this.props.digest || defaultHash.digest,
            email: this.props.email || faker.internet.email(),
            hasPassword: this.props.hasPassword,
            hash: this.props.hash || defaultHash.hash,
            id: this.props.id,
            isAdmin: this.props.isAdmin ?? faker.random.boolean(),
            isConfirmed: this.props.isConfirmed ?? faker.random.boolean(),
            iterations: this.props.iterations || defaultHash.iterations,
            keyLength: this.props.keyLength || defaultHash.keyLength,
            lastActivityDate: this.props.lastActivityDate || faker.date.recent(),
            name: this.props.name || faker.name.findName(),
            picture: this.props.picture || await this.downloadPicture(pictureUrl),
            salt: this.props.salt || defaultHash.salt,
            updatedAt: this.props.updatedAt
        };

        this.props = generatedProps;
        return generatedProps;
    }

    async downloadPicture (url: string): Promise<Buffer | undefined> {
        if (!this.options?.shouldDownloadUserPictures) {
            return undefined;
        }

        let picture;

        try {
            picture = await new Download(url, { fileExt: IMAGE_EXT }).getFile();
        } finally {
            return picture; // eslint-disable-line
        }
    }

    async save (): Promise<User> | never {
        const props = await this.populate();
        return User.create(props, this.include);
    }
}

export default FakeUser;
