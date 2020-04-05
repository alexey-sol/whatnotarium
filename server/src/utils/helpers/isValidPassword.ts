import HashOptions from "#models/HashOptions";
import User from "#models/User";
import hashPassword from "#utils/helpers/hashPassword";

type IsValidPassword = (
    passwordToCheck: string,
    user: User
) => Promise<boolean> | never;

const isValidPassword: IsValidPassword = async function (
    passwordToCheck: string,
    user: User
): Promise<boolean> | never {
    const { id, password } = user;
    const hashOptions = await HashOptions.findOne({ userId: id });

    if (!hashOptions) {
        return false;
    }

    const {
        hash: hashToCheck
    } = await hashPassword(passwordToCheck, hashOptions);

    return hashToCheck.equals(password);
};

export default isValidPassword;
