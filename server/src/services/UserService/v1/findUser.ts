import { PROFILES } from "#utils/const/database/tableNames";
import User from "#models/User";
import UserItem from "#types/user/Item";

export default async function (
    id: number
): Promise<UserItem | null> {
    const include = [{
        as: "profile",
        attributes: ["about", "birthdate", "lastActivityDate", "name", "picture", "totalVoteCount"],
        referencedKey: "userId",
        ownKey: "id",
        tableName: PROFILES
    }];

    return User.findById(id, include);
}
