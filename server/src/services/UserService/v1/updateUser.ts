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
import UserItem from "#types/user/Item";
import attachProfileToUserItem from "#utils/helpers/attachProfileToUserItem";
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
    const userProps: UserAttributes = { email };
    const shouldUpdatePassword = Boolean(newPassword);

    if (shouldUpdatePassword) {
        const hashResult = await hashPassword(newPassword as string);
        const { hash, ...options } = hashResult;

        await updateHashOptions(user.id, options);
        userProps.password = hash;
    }

    const profile = await updateProfile({
        name,
        userId: user.id
    });

    const updatedUser = await user.updateAttributes(userProps);

    return attachProfileToUserItem(updatedUser, profile);
}

async function updateProfile (
    props: ProfileAttributes
): Promise<Profile> | never {
    const profile = await Profile.findOne({
        where: { userId: props.userId }
    });

    if (!profile) {
        throw new ProfileError(NOT_FOUND, 404);
    }

    return profile.updateAttributes(props);
}

async function updateHashOptions (
    userId: number,
    hashPasswordOptions: HashPasswordOptions
): Promise<HashOptions> | never {
    const hashOptions = await HashOptions.findOne({
        where: { userId }
    });

    if (!hashOptions) {
        throw new HashOptionsError(NOT_FOUND, 404);
    }

    return hashOptions.updateAttributes(hashPasswordOptions);
}
