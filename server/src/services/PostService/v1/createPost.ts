import { PROFILES } from "#utils/const/database/tableNames";
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
    const include = [{
        as: "author",
        attributes: ["name", "picture"],
        referencedKey: "userId",
        ownKey: "userId",
        tableName: PROFILES
    }];

    return Post.create(props, include);
}
