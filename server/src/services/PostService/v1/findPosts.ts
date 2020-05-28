import Post from "#models/Post";
import PostWithAuthor from "#types/post/PostWithAuthor";
import User from "#models/User";

interface Filter {
    limit?: number;
    offset?: number;
    userId?: number;
}

export default async function (
    filter?: Filter
): Promise<PostWithAuthor[]> {
    const { limit, offset, userId } = filter || {};

    const formattedFilter = {
        limit,
        offset,
        where: { userId }
    };

    const posts = await Post.findAll(formattedFilter); // TODO: include filter

    const postsWithAuthors = [];

    for (const post of posts) {
        const author = await User.findById(post.userId) as User;
        // TODO: exlude user.password and post.userId

        postsWithAuthors.push({
            ...post,
            author
        });
    }

    return postsWithAuthors;
}
