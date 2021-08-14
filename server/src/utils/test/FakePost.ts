import faker from "faker";

import { FakeDataOnCreate, FakeDataOnUpdate } from "#types/test/post";
import FakeModel from "#types/FakeModel";
import Include from "#root/src/types/Include";
import Post from "#models/Post";
import getRandomIntFromRange from "../helpers/getRandomIntFromRange";

class FakePost implements FakeModel<Post, FakeDataOnCreate> {
    constructor (
        private options: FakeDataOnUpdate = {},
        private include?: Include[]
    ) {
        this.options = options;
        this.include = include;
    }

    populate (): FakeDataOnCreate {
        const wordCount = getRandomIntFromRange([2, 10]);

        const generatedOptions = {
            body: this.options.body || this.generateBody(),
            isApproved: this.options.isApproved ?? faker.random.boolean(),
            isFrozen: this.options.isFrozen ?? faker.random.boolean(),
            title: this.options.title || faker.lorem.words(wordCount),
            userId: this.options.userId || faker.random.number({ min: 1 })
        };

        this.options = generatedOptions;
        return generatedOptions;
    }

    generateBody (): string { // [1]
        const sentenceCount = getRandomIntFromRange([5, 20]);
        const paragraphCount = getRandomIntFromRange([1, 8]);
        let paragraphs = "";

        for (let i = 0; i < paragraphCount; i += 1) {
            const paragraphContent = faker.lorem.sentences(sentenceCount);
            paragraphs += `<p>${paragraphContent}</p>`;
        }

        return paragraphs;
    }

    async save (): Promise<Post> | never {
        const props = this.populate();
        return Post.create(props, this.include);
    }
}

export default FakePost;

// [1]. Faker already has lorem.paragraphs method but there's no way to adjust the
// number of the sentences in each paragraph.
