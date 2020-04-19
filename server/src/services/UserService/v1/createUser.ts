import User from "#models/User";
import HashOptions from "#models/HashOptions";
import hashPassword from "#utils/helpers/hashPassword";

interface Props {
    email: string;
    name: string;
    password: string;
}

export default async function (
    props: Props
): Promise<User> {
    const { password } = props;
    const hashResult = await hashPassword(password);
    const { hash } = hashResult;

    const user = await User.create({
        ...props,
        createdAt: new Date(),
        password: hash,
        updatedAt: new Date()
    });

    await HashOptions.create({
        ...hashResult,
        userId: user.id
    });

    return user;
}
