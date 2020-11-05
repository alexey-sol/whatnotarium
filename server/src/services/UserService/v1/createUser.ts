import HashOptions from "#models/HashOptions";
import HashOptionsAttributes from "#types/hashOptions/Attributes";
import Profile from "#models/Profile";
import ProfileAttributes from "#types/profile/Attributes";
import User from "#models/User";
import UserItem from "#types/user/Item";
import attachProfileToUserItem from "#utils/helpers/attachProfileToUserItem";
import hashPassword from "#utils/helpers/hashPassword";

interface Props {
    email: string;
    name: string;
    password: string;
}

export default async function (
    props: Props
): Promise<UserItem> {
    const { email, name, password } = props;
    const { hash, ...restOptions } = await hashPassword(password);

    const user = await User.create({
        email,
        password: hash
    });

    await createHashOptions({
        ...restOptions,
        userId: user.id
    });

    const profile = await createProfile({
        name,
        userId: user.id
    });

    return attachProfileToUserItem(user, profile);
}

async function createHashOptions (
    props: HashOptionsAttributes
): Promise<HashOptions> {
    const {
        digest,
        iterations,
        keyLength,
        salt,
        userId
    } = props;

    const hashOptionsProps = {
        digest,
        iterations,
        keyLength,
        salt,
        userId
    };

    return HashOptions.create(hashOptionsProps);
}

async function createProfile (
    props: ProfileAttributes
): Promise<Profile> {
    const { name, userId } = props;

    return Profile.create({
        name,
        userId
    });
}
