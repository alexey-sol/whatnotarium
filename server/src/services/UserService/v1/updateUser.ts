import { NOT_FOUND } from "#utils/const/validationErrors";
import HashOptions from "#models/HashOptions";
import HashOptionsError from "#utils/errors/HashOptionsError";
import HashPasswordOptions from "#types/HashPasswordOptions";
import Profile from "#models/Profile";
import ProfileAttributes from "#types/profile/Attributes";
import ProfileError from "#utils/errors/ProfileError";
import User from "#models/User";
import UserAttributes from "#types/user/Attributes";
import UserError from "#utils/errors/UserError";
import hashPassword from "#utils/helpers/hashPassword";

interface Props {
    email?: string;
    name?: string;
    newPassword?: string;
    picture?: Buffer;
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
        newPassword,
        picture
    } = props;

    const userProps: UserAttributes = { email };
    const shouldUpdatePassword = Boolean(newPassword);
    const shouldUpdateProfile = Boolean(name || picture);

    if (shouldUpdatePassword) {
        const hashResult = await hashPassword(newPassword as string);
        const { hash } = hashResult;

        await updateHashOptions(user.id, hashResult);
        userProps.password = hash;
    }

    if (shouldUpdateProfile) {
        const profileProps = { name, picture };
        await updateProfile(user.id, profileProps);
    }

    return user.updateAttributes(userProps);
}

async function updateProfile (
    userId: number,
    profileProps: ProfileAttributes
): Promise<void> | never {
    const profile = await Profile.findOne({
        where: { userId }
    });

    if (!profile) {
        throw new ProfileError(NOT_FOUND, 404);
    }

    await profile.updateAttributes(profileProps);
}

async function updateHashOptions (
    userId: number,
    hashPasswordOptions: HashPasswordOptions
): Promise<void> | never {
    const hashOptions = await HashOptions.findOne({
        where: { userId }
    });

    if (!hashOptions) {
        throw new HashOptionsError(NOT_FOUND, 404);
    }

    await hashOptions.updateAttributes(hashPasswordOptions);
}
