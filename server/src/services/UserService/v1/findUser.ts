import { PROFILES } from "#utils/const/database/tableNames";
import User from "#models/User";
import UserItem from "#types/user/Item";
import complementUserItem from "#utils/helpers/complementUserItem";

export default async function (
    id: number
): Promise<UserItem | null> {
    const include = [{
        as: "profile",
        attributes: ["name", "picture"],
        referencedKey: "userId",
        ownKey: "id",
        tableName: PROFILES
    }];

    const user = await User.findById(id, include);

    return (user)
        ? complementUserItem(user)
        : null;
}
