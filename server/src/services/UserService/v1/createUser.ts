import { PROFILES } from "#utils/const/database/tableNames";
import User from "#models/User";
import UserItem from "#types/user/Item";
import hashPassword from "#utils/helpers/hashPassword";

interface Props {
    birthdate?: Date;
    email: string;
    isConfirmed?: boolean;
    isOauth?: boolean;
    name: string;
    password?: string;
    picture?: Buffer;
}

export default async function (
    props: Props
): Promise<UserItem> {
    const { isOauth = false, password, ...restProps } = props;

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
        ...hashOptions,
        isOauth
    }, [includeProfile]);
}
