import { PROFILES } from "#utils/const/database/tableNames";
import Post from "#models/Post";
import PostItem from "#types/post/Item";
import complementPostItem from "#utils/helpers/complementPostItem";

export default async function (
    id: number
): Promise<PostItem | null> {
    const include = [{
        as: "author",
        attributes: ["name", "picture"],
        referencedKey: "userId",
        ownKey: "userId",
        tableName: PROFILES
    }];

    const post = await Post.findById(id, include);

    return (post)
        ? complementPostItem(post)
        : null;
}
