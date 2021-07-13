import { NOT_FOUND } from "#utils/const/validationErrors";
import { PROFILES } from "#utils/const/database/tableNames";
import Post from "#models/Post";
import PostError from "#utils/errors/PostError";
import UpdatePostVoteDto from "#types/post/UpdatePostVoteDto";

export default async function (
    id: number,
    props: UpdatePostVoteDto
): Promise<Post | null> | never {
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

    return post.updateVote(props, include);
}
