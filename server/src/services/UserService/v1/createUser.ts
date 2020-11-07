import User from "#models/User";
import UserItem from "#types/user/Item";
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
    const hashOptions = await hashPassword(password);

    return User.create({
        email,
        name,
        ...hashOptions
    });
}
