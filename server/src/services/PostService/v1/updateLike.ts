import { NOT_FOUND } from "#utils/const/validationErrors";
import LikeUpdate from "#types/LikeUpdate";
import Post from "#models/Post";
import PostError from "#utils/errors/PostError";

export default async function (
    id: number,
    props: LikeUpdate
): Promise<number | null> | never {
    const post = await Post.findById(id);

    if (!post) {
        throw new PostError(NOT_FOUND, 404);
    }

    return post.updateLike(props);
}
