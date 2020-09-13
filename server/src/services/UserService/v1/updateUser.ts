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
): Promise<UserItem> | never {
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

    if (shouldUpdatePassword) {
        const hashResult = await hashPassword(newPassword as string);
        const { hash } = hashResult;

        await updateHashOptions(user.id, hashResult);
        userProps.password = hash;
    }

    const profile = await updateProfile({
        name,
        picture,
        userId: user.id
    });

    const updatedUser = await user.updateAttributes(userProps);

    return { // TODO: no need to return the whole object
        ...updatedUser,
        profile
    };
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
