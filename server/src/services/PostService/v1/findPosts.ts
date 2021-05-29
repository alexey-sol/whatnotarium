import { PROFILES } from "#utils/const/database/tableNames";
import DbQueryFilter from "#types/DbQueryFilter";
import FetchedList from "#types/FetchedList";
import Post from "#models/Post";
import PostAttributes from "#types/post/Attributes";
import PostItem from "#types/post/Item";

type PostItemsList = FetchedList<PostItem>;

export default async function (
    filter: DbQueryFilter<PostAttributes> = {}
): Promise<PostItemsList> {
    const include = [{
        as: "author",
        attributes: ["about", "birthdate", "lastActivityDate", "name", "picture", "totalVoteCount"],
        referencedKey: "userId",
        ownKey: "userId",
        tableName: PROFILES
    }];

    const updatedFilter = {
        ...filter,
        include,
        order: filter.order || "\"createdAt\" DESC"
    };

    const { operators, where } = filter;

    return {
        items: await Post.findAll(updatedFilter),
        totalCount: await Post.count({ operators, where })
    };
}
