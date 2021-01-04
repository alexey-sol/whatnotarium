import { $ilike, $or } from "#utils/const/database/modelOperators";
import { PROFILES } from "#utils/const/database/tableNames";
import FetchedList from "#types/FetchedList";
import User from "#models/User";
import UserItem from "#types/user/Item";

type UserItemsList = FetchedList<UserItem>;

export default async function (
    searchTerm: string
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

    const rawItems = await User.findAll({ include, operators, where });
    const items = rawItems.filter(({ isAdmin }) => !isAdmin);
    const totalCount = items.length;

    return { items, totalCount };
}
