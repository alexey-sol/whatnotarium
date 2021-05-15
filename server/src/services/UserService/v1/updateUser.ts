import { NOT_FOUND } from "#utils/const/validationErrors";
import { PROFILES } from "#utils/const/database/tableNames";
import DataOnUpdate from "#types/user/DataOnUpdate";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import UserItem from "#types/user/Item";
import hashPassword from "#utils/helpers/hashPassword";

interface Props {
    email?: string;
    isConfirmed?: boolean;
    name?: string;
    newPassword?: string;
    password?: string;
    picture?: Express.Multer.File;
}

export default async function (
    id: number,
    props: Props
): Promise<UserItem> | never {
    const user = await User.findById(id);

    if (!user) {
        throw new UserError(NOT_FOUND, 404);
    }

    const {
        newPassword,
        password: _,
        ...rest
    } = props;

    let userProps: DataOnUpdate = { ...rest };
    const isNewEmail = props.email && props.email !== user.email;

    if (isNewEmail) {
        userProps.isConfirmed = false;
    }

    if (newPassword) {
        const hashResult = await hashPassword(newPassword);

        userProps = {
            ...userProps,
            ...hashResult
        };
    }

    const includeProfile = {
        as: "profile",
        attributes: ["about", "birthdate", "lastActivityDate", "name", "picture", "totalVoteCount"],
        referencedKey: "userId",
        ownKey: "id",
        tableName: PROFILES
    };

    return user.updateAttributes(userProps, [includeProfile]);
}
