import { $ilike, $or } from "#utils/const/database/modelOperators";
import { PROFILES } from "#utils/const/database/tableNames";
import DbQueryFilter from "#types/DbQueryFilter";
import FetchedList from "#types/FetchedList";
import User from "#models/User";
import UserAttributes from "#types/user/Attributes";
import UserItem from "#types/user/Item";

type UserItemsList = FetchedList<UserItem>;

export default async function (
    searchTerm: string,
    filter: DbQueryFilter<UserAttributes> = {}
): Promise<UserItemsList> {
    const include = [{
        as: "profile",
        attributes: ["about", "birthdate", "lastActivityDate", "name", "picture", "totalVoteCount"],
        referencedKey: "userId",
        ownKey: "id",
        tableName: PROFILES
    }];

    const operators = {
        matchingOp: $ilike as typeof $ilike,
        conjunctionOp: $or as typeof $or
    };

    const where = {
        about: `%${searchTerm}%`,
        name: `%${searchTerm}%`
    };

    const countFilter = { include, operators, where };

    const itemFilter = {
        order: "\"createdAt\" DESC",
        ...countFilter,
        ...filter
    };

    const results = await Promise.all([
        User.findAll(itemFilter),
        User.findAll(countFilter)
    ]);

    const rawItems = results[0];
    const totalItems = results[1];
    const filteredTotalItems = totalItems
        .filter(({ isAdmin, isConfirmed }) => !isAdmin && isConfirmed);

    return {
        items: rawItems.filter(({ isAdmin, isConfirmed }) => !isAdmin && isConfirmed),
        totalCount: filteredTotalItems.length
    };
}
