import faker from "faker";

import { FakeDataOnCreate, FakeDataOnUpdate } from "#types/test/post";
import FakeModel from "#types/FakeModel";
import Include from "#root/src/types/Include";
import Post from "#models/Post";
import TextFormatter from "#utils/formatters/TextFormatter";
import getRandomIntFromRange from "../helpers/getRandomIntFromRange";

class FakePost implements FakeModel<Post, FakeDataOnCreate> {
    constructor (
        private props: FakeDataOnUpdate = {},
        private include?: Include[]
    ) {
        this.props = props;
        this.include = include;
    }

    static generateBody (): string { // [1]
        const sentenceCount = getRandomIntFromRange([5, 20]);
        const paragraphCount = getRandomIntFromRange([2, 10]);
        let paragraphs = "";

        for (let i = 0; i < paragraphCount; i += 1) {
            const paragraphContent = faker.lorem.sentences(sentenceCount);
            paragraphs += `<p>${paragraphContent}</p>`;
        }

        return paragraphs;
    }

    static generateTitle (): string {
        const wordCount = getRandomIntFromRange([2, 10]);
        const rawTitle = faker.lorem.words(wordCount);
        const formatter = new TextFormatter(rawTitle);
        return formatter.capitalize();
    }

    populate (): FakeDataOnCreate {
        const generatedProps = {
            body: this.props.body || FakePost.generateBody(),
            isApproved: this.props.isApproved ?? faker.random.boolean(),
            isFrozen: this.props.isFrozen ?? faker.random.boolean(),
            title: this.props.title || FakePost.generateTitle(),
            userId: this.props.userId || faker.random.number({ min: 1 })
        };

        this.props = generatedProps;
        return generatedProps;
    }

    async save (): Promise<Post> | never {
        const props = this.populate();
        return Post.create(props, this.include);
    }
}

export default FakePost;

// [1]. Faker already has lorem.paragraphs method but there's no way to adjust the
// number of the sentences in each paragraph.
