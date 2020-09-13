import Post from "#models/Post";
import PostItem from "#types/post/Item";

interface Props {
    body: string;
    title: string;
    userId: number;
}

export default async function (
    props: Props
): Promise<PostItem> | never {
    return Post.create(props);
}
