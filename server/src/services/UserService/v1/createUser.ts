import { PROFILES } from "#utils/const/database/tableNames";
import User from "#models/User";
import UserItem from "#types/user/Item";
import hashPassword from "#utils/helpers/hashPassword";

interface Props {
    email: string;
    isConfirmed?: boolean;
    name: string;
    password: string;
}

export default async function (
    props: Props
): Promise<UserItem> {
    const {
        email,
        isConfirmed,
        name,
        password
    } = props;

    const hashOptions = await hashPassword(password);

    const includeProfile = {
        as: "profile",
        attributes: ["about", "birthdate", "lastActivityDate", "name", "picture", "totalVoteCount"],
        referencedKey: "userId",
        ownKey: "id",
        tableName: PROFILES
    };

    return User.create({
        email,
        isConfirmed,
        name,
        ...hashOptions
    }, [includeProfile]);
}
