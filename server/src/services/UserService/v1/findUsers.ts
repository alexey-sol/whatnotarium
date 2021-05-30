import { PROFILES } from "#utils/const/database/tableNames";
import DbQueryFilter from "#types/DbQueryFilter";
import FetchedList from "#types/FetchedList";
import User from "#models/User";
import UserAttributes from "#types/user/Attributes";
import UserItem from "#types/user/Item";

type UserItemsList = FetchedList<UserItem>;

export default async function (
    filter: DbQueryFilter<UserAttributes> = {}
): Promise<UserItemsList> {
    const include = [{
        as: "profile",
        attributes: ["about", "birthdate", "lastActivityDate", "name", "picture", "totalVoteCount"],
        referencedKey: "userId",
        ownKey: "id",
        tableName: PROFILES
    }];

    const updatedFilter = {
        ...filter,
        include,
        order: filter.order || "\"createdAt\" DESC"
    };

    const { operators, where } = filter;

    return {
        items: await User.findAll(updatedFilter),
        totalCount: await User.count({ operators, where })
    };
}
