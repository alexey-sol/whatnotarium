import Post from "#models/Post";
import PostWithAuthor from "#types/post/PostWithAuthor";
import User from "#models/User";

export default async function (
    id: number
): Promise<PostWithAuthor | null> {
    const post = await Post.findById(id);

    if (!post) {
        return null;
    }

    const postWithAuthor = { // TODO: include filter
        ...post,
        author: await User.findById(post.userId) as User
    };

    return postWithAuthor;
}
