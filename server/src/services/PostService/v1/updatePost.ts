import { NOT_FOUND } from "#utils/const/validationErrors";
import { PROFILES } from "#utils/const/database/tableNames";
import Post from "#models/Post";
import PostError from "#utils/errors/PostError";
import PostItem from "#types/post/Item";

interface Props {
    body?: string;
    title?: string;
}

export default async function (
    id: number,
    props: Props
): Promise<PostItem> | never {
    const post = await Post.findById(id);

    if (!post) {
        throw new PostError(NOT_FOUND, 404);
    }

    const {
        body,
        title
    } = props;

    const updatedProps = {
        body,
        title,
        updatedAt: new Date()
    };

    const include = [{
        as: "author",
        attributes: ["about", "birthdate", "lastActivityDate", "name", "picture", "totalVoteCount"],
        referencedKey: "userId",
        ownKey: "userId",
        tableName: PROFILES
    }];

    return post.updateAttributes(updatedProps, include);
}
