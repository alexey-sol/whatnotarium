import { NOT_FOUND } from "#utils/const/validationErrors";
import FormattedProps from "#types/post/FormattedProps";
import Post from "#models/Post";
import PostError from "#utils/errors/PostError";
import PostWithAuthor from "#types/post/PostWithAuthor";
import User from "#models/User";

interface Props {
    body?: string;
    title?: string;
}

export default async function (
    id: number,
    props: Props
): Promise<PostWithAuthor> | never {
    const post = await Post.findById(id);

    if (!post) {
        throw new PostError(NOT_FOUND, 404);
    }

    const {
        body,
        title
    } = props;

    const updatedProps: FormattedProps = {
        body,
        title,
        updatedAt: new Date()
    };

    const updatedPost = await post.updateAttributes(updatedProps);

    const postWithAuthor = { // TODO: include filter
        ...updatedPost,
        author: await User.findById(post.userId) as User
    };

    return postWithAuthor;
}
