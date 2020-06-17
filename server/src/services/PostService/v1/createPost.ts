import Post from "#models/Post";
import PostWithAuthor from "#types/post/PostWithAuthor";
import User from "#models/User";

interface Props {
    body: string;
    title: string;
    userId: number;
}

export default async function (
    props: Props
): Promise<PostWithAuthor> | never {
    const post = await Post.create(props);

    const postWithAuthor = { // TODO: include filter
        ...post,
        author: await User.findById(post.userId) as User
    };

    return postWithAuthor;
}
