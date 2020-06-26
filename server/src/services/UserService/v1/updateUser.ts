import { NOT_FOUND } from "#utils/const/validationErrors";
import Attributes from "#types/user/Attributes";
import HashOptions from "#models/HashOptions";
import HashPasswordOptions from "#types/HashPasswordOptions";
import Profile from "#models/Profile";
import ProfileError from "#utils/errors/ProfileError";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import hashPassword from "#utils/helpers/hashPassword";

interface Props {
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

    const profile = await Profile.findOne({ // TODO: refactor, make "updateProfile" func
        where: { userId: id }
    });

    if (!profile) {
        throw new ProfileError(NOT_FOUND, 404);
    }

    const {
        email,
        name,
        newPassword
    } = props;

    const userProps: Attributes = { email };
    const profileProps = { name };

    if (newPassword) {
        const hashResult = await hashPassword(newPassword);
        const { hash } = hashResult;

        await updateHashOptions(user.id, hashResult);
        userProps.password = hash;
    }

    await profile.updateAttributes(profileProps);
    return user.updateAttributes(userProps);
}

async function updateHashOptions (
    userId: number,
    hashPasswordOptions: HashPasswordOptions
): Promise<void> {
    const hashOptions = await HashOptions.findOne({
        where: { userId }
    });

    await hashOptions?.updateAttributes(hashPasswordOptions);
}
