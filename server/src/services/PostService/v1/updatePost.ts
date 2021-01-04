import { NOT_FOUND } from "#utils/const/validationErrors";
import { PROFILES } from "#utils/const/database/tableNames";
import Post from "#models/Post";
import PostError from "#utils/errors/PostError";
import PostItem from "#types/post/Item";

interface Props {
    body?: string;
    isApproved?: boolean;
    title?: string;
    viewCount?: number;
}

export default async function (
    id: number,
    props: Props
): Promise<PostItem> | never {
    const post = await Post.findById(id);

    if (!post) {
        throw new PostError(NOT_FOUND, 404);
    }

    const include = [{
        as: "author",
        attributes: ["about", "birthdate", "lastActivityDate", "name", "picture", "totalVoteCount"],
        referencedKey: "userId",
        ownKey: "userId",
        tableName: PROFILES
    }];

    const shouldRetainUpdatedAt = (
        (Number.isInteger(props.viewCount) || typeof props.isApproved === "boolean") &&
        Object.keys(props).length === 1
    );

    const options = (shouldRetainUpdatedAt)
        ? { skipUpdatedAt: true }
        : undefined;

    return post.updateAttributes(props, include, options);
}
