import { PROFILES } from "#utils/const/database/tableNames";
import CreateUserDto from "#types/user/CreateUserDto";
import User from "#models/User";
import UserItem from "#types/user/Item";
import hashPassword from "#utils/helpers/hashPassword";

export default async function (
    props: CreateUserDto
): Promise<UserItem> {
    const { password, ...restProps } = props;

    const hashOptions = (password)
        ? await hashPassword(password)
        : null;

    const includeProfile = {
        as: "profile",
        attributes: ["about", "birthdate", "lastActivityDate", "name", "picture", "totalVoteCount"],
        referencedKey: "userId",
        ownKey: "id",
        tableName: PROFILES
    };

    return User.create({
        ...restProps,
        ...hashOptions
    }, [includeProfile]);
}
