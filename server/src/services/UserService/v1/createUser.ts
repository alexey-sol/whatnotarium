import User from "#models/User";
import HashOptions from "#models/HashOptions";
import Profile from "#models/Profile";
import hashPassword from "#utils/helpers/hashPassword";

interface Props {
    email: string;
    name: string;
    password: string;
}

export default async function (
    props: Props
): Promise<User> {
    const { email, name, password } = props;
    const hashResult = await hashPassword(password);

    const {
        digest,
        hash,
        iterations,
        keyLength,
        salt
    } = hashResult;

    const user = await User.create({
        email,
        password: hash
    });

    await Profile.create({
        name,
        userId: user.id
    });

    const hashOptionsProps = {
        digest,
        iterations,
        keyLength,
        salt,
        userId: user.id
    };

    await HashOptions.create(hashOptionsProps);

    return user;
}
