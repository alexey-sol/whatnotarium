import { NOT_FOUND } from "#utils/const/validationErrors";
import FormattedProps from "#types/post/FormattedProps";
import Post from "#models/Post";
import PostError from "#utils/errors/PostError";

interface Props {
    body?: string;
    title?: string;
}

export default async function (
    id: number,
    props: Props
): Promise<Post> | never {
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

    return post.updateAttributes(updatedProps);
}
