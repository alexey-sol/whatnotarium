import { NOT_FOUND } from "#utils/const/validationErrors";
import { PROFILES } from "#utils/const/database/tableNames";
import Post from "#models/Post";
import PostError from "#utils/errors/PostError";
import PostItem from "#types/post/Item";
import UpdatePostDto from "#types/post/UpdatePostDto";

export default async function (
    id: number,
    props: UpdatePostDto
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

function checkIfShouldRetainUpdatedAt (props: UpdatePostDto): boolean {
    const isFrozen = typeof props.isFrozen === "boolean";
    const isMinorUpdate = (
        Number.isInteger(props.viewCount) ||
        typeof props.isApproved === "boolean"
    );
    const isOnlyMinorUpdate = Object.keys(props).length === 1;

    return isFrozen || (isMinorUpdate && isOnlyMinorUpdate);
}
