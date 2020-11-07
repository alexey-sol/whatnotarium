import { NOT_FOUND } from "#utils/const/validationErrors";
import DataOnUpdate from "#types/user/DataOnUpdate";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import UserItem from "#types/user/Item";
import hashPassword from "#utils/helpers/hashPassword";

interface Props {
    email?: string;
    name?: string;
    newPassword?: string;
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

    const { email, name, newPassword } = props;
    let userProps: DataOnUpdate = { email, name };

    if (newPassword) {
        const hashResult = await hashPassword(newPassword);

        userProps = {
            ...userProps,
            ...hashResult
        };
    }

    return user.updateAttributes(userProps);
}
