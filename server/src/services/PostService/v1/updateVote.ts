import { NOT_FOUND } from "#utils/const/validationErrors";
import Post from "#models/Post";
import PostError from "#utils/errors/PostError";
import VoteUpdate from "#types/VoteUpdate";

export default async function (
    id: number,
    props: VoteUpdate
): Promise<number | null> | never {
    const post = await Post.findById(id);

    if (!post) {
        throw new PostError(NOT_FOUND, 404);
    }

    return post.updateVote(props);
}
