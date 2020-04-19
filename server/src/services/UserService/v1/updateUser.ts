import { NOT_FOUND } from "#utils/const/validationErrors";
import FormattedProps from "#types/user/FormattedProps";
import HashOptions from "#models/HashOptions";
import HashPasswordOptions from "#types/HashPasswordOptions";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import hashPassword from "#utils/helpers/hashPassword";

interface Props {
    currentPassword?: string;
    email?: string;
    name?: string;
    newPassword?: string;
}

export default async function (
    id: number,
    props: Props
): Promise<User> | never {
    const user = await User.findById(id);

    if (!user) {
        throw new UserError(NOT_FOUND, 404);
    }

    const {
        email,
        name,
        newPassword
    } = props;

    const updatedProps: FormattedProps = {
        email,
        name,
        updatedAt: new Date()
    };

    if (newPassword) {
        const hashResult = await hashPassword(newPassword);
        const { hash } = hashResult;

        await updateHashOptions(user.id, hashResult);
        updatedProps.password = hash;
    }

    return user.updateAttributes(updatedProps);
}

async function updateHashOptions (
    id: number,
    hashPasswordOptions: HashPasswordOptions
): Promise<void> {
    const hashOptions = await HashOptions.findOne({ userId: id });
    await hashOptions?.updateAttributes(hashPasswordOptions);
}
