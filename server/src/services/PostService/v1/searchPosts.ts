import { $ilike, $or } from "#utils/const/database/modelOperators";
import { APPROVED } from "#utils/const/postStatuses";
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
    // the result that the DB returns. It's a pretty crappy solution but it would be way too
    // difficult to revamp the SQL generator.

    const rawItems = await Post.findAll({ include, operators, where });
    const items = rawItems.filter(({ status }) => status === APPROVED);
    const totalCount = items.length;

    return { items, totalCount };
}
