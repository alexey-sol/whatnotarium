import { PROFILES } from "#utils/const/database/tableNames";
import FetchedList from "#types/FetchedList";
import Post from "#models/Post";
import PostAttributes from "#types/post/Attributes";
import PostItem from "#types/post/Item";
import DbQueryFilter from "#types/DbQueryFilter";

type PostItemsList = FetchedList<PostItem>;

export default async function (
    filter: DbQueryFilter<PostAttributes> = {}
): Promise<PostItemsList> {
    const include = [{
        as: "author",
        attributes: ["name", "picture"],
        referencedKey: "userId",
        ownKey: "userId",
        tableName: PROFILES
    }];

    const updatedFilter = {
        ...filter,
        include,
        order: "\"createdAt\" DESC" // TODO: to const?
    };

    return {
        items: await Post.findAll(updatedFilter),
        totalCount: await Post.count()
    };
}
