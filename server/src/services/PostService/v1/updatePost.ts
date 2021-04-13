import { NOT_FOUND } from "#utils/const/validationErrors";
import { PROFILES } from "#utils/const/database/tableNames";
import Post from "#models/Post";
import PostError from "#utils/errors/PostError";
import PostItem from "#types/post/Item";

interface Props {
    body?: string;
    isApproved?: boolean;
    isFrozen?: boolean;
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

    const options = checkIfShouldRetainUpdatedAt(props)
        ? { skipUpdatedAt: true }
        : undefined;

    const updatedProps = { ...props };
    const shouldFreezePost = !post.isFrozen && !post.isApproved;

    if (shouldFreezePost) {
        updatedProps.isFrozen = true;
    }

    return post.updateAttributes(updatedProps, include, options);
}

function checkIfShouldRetainUpdatedAt (props: Props): boolean {
    const isFrozen = typeof props.isFrozen === "boolean";
    const isMinorUpdate = (
        Number.isInteger(props.viewCount) ||
        typeof props.isApproved === "boolean"
    );
    const isOnlyMinorUpdate = Object.keys(props).length === 1;

    return isFrozen || (isMinorUpdate && isOnlyMinorUpdate);
}
