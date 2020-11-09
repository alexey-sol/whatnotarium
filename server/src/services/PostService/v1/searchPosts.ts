import { $ilike, $or } from "#utils/const/database/modelOperators";
import { PROFILES } from "#utils/const/database/tableNames";
import FetchedList from "#types/FetchedList";
import Post from "#models/Post";
import PostItem from "#types/post/Item";

type PostItemsList = FetchedList<PostItem>;

export default async function (
    searchTerm: string
): Promise<PostItemsList> {
    const include = [{
        as: "author",
        attributes: ["name", "picture"],
        referencedKey: "userId",
        ownKey: "userId",
        tableName: PROFILES
    }];

    const operators = {
        matchingOp: $ilike as typeof $ilike,
        conjunctionOp: $or as typeof $or
    };

    const where = {
        body: `%${searchTerm}%`,
        name: `%${searchTerm}%`,
        title: `%${searchTerm}%`
    };

    const items = await Post.findAll({ include, operators, where });
    const totalCount = items.length;

    return { items, totalCount };
}
