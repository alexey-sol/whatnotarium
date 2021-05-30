import { $ilike, $or } from "#utils/const/database/modelOperators";
import { PROFILES } from "#utils/const/database/tableNames";
import DbQueryFilter from "#types/DbQueryFilter";
import FetchedList from "#types/FetchedList";
import Post from "#models/Post";
import PostAttributes from "#types/post/Attributes";
import PostItem from "#types/post/Item";

type PostItemsList = FetchedList<PostItem>;

export default async function (
    searchTerm: string,
    filter: DbQueryFilter<PostAttributes> = {}
): Promise<PostItemsList> {
    const include = [{
        as: "author",
        attributes: ["about", "birthdate", "lastActivityDate", "name", "picture", "totalVoteCount"],
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

    // Unfortunately, I didn't implement combining operators in the SQL generator, so we can
    // use only one operator for the where clause ("OR" in this case). So later we just filter
    // the result that the DB returns. It's a pretty ugly solution but it would be way too
    // difficult to revamp the SQL generator.

    const countFilter = { include, operators, where };

    const itemFilter = {
        order: "\"createdAt\" DESC",
        ...countFilter,
        ...filter
    };

    const results = await Promise.all([
        Post.findAll(itemFilter),
        Post.findAll(countFilter)
    ]);

    const rawItems = results[0];
    const totalItems = results[1];
    const filteredTotalItems = totalItems.filter(({ isApproved }) => isApproved);

    return {
        items: rawItems.filter(({ isApproved }) => isApproved),
        totalCount: filteredTotalItems.length
    };
}
