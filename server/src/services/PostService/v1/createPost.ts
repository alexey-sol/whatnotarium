import Post from "#models/Post";
import PostItem from "#types/post/Item";
import complementPostItem from "#utils/helpers/complementPostItem";

interface Props {
    body: string;
    title: string;
    userId: number;
}

export default async function (
    props: Props
): Promise<PostItem> | never {
    const post = await Post.create(props);
    return complementPostItem(post);

    // TODO: implement include for create/update (add "author" field to the result object),
    // so that I can get rid of complementPostItem, complementUserItem
}
