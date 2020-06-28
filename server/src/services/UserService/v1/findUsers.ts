import { PROFILES } from "#utils/const/database/tableNames";
import FetchedList from "#types/FetchedList";
import User from "#models/User";
import UserItem from "#types/user/Item";
import complementUserItem from "#utils/helpers/complementUserItem";

type UserItemsList = FetchedList<UserItem>;

interface Options {
    email?: string;
    limit?: number;
    offset?: number;
}

export default async function (
    options: Options = {}
): Promise<UserItemsList> {
    const { email, limit, offset } = options;

    const include = [{
        as: "profile",
        attributes: ["name", "picture"],
        referencedKey: "userId",
        ownKey: "id",
        tableName: PROFILES
    }];

    const filter = {
        include,
        limit,
        offset,
        where: {}
    };

    if (email) {
        filter.where = { email };
    }

    const users = await User.findAll(filter);
    const completedUsers = [];

    for (const user of users) {
        completedUsers.push(await complementUserItem(user));
    }

    return {
        items: completedUsers,
        totalCount: await User.count()
    };
}
