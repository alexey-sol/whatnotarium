import { $ilike, $or } from "#utils/const/database/modelOperators";
import { PROFILES } from "#utils/const/database/tableNames";
import Attributes from "#types/user/Attributes";
import FetchedList from "#types/FetchedList";
import User from "#models/User";
import UserItem from "#types/user/Item";

type UserItemsList = FetchedList<UserItem>;

export default async function (
    searchTerm: string
): Promise<UserItemsList> {
    const include = [{
        as: "profile",
        attributes: ["name", "picture"],
        referencedKey: "userId",
        ownKey: "id",
        tableName: PROFILES
    }];

    const operators = {
        matchingOp: $ilike as typeof $ilike,
        conjunctionOp: $or as typeof $or
    };

    const where = {
        name: `%${searchTerm}%`
        // TODO: search by about?
    } as Attributes;

    const items = await User.findAll({ include, operators, where });
    const totalCount = items.length;

    return { items, totalCount };
}
