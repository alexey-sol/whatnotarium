import Post from "#models/Post";

interface Props {
    body: string;
    title: string;
    userId: number;
}

export default async function (
    props: Props
): Promise<Post> {
    return Post.create(props);
}
