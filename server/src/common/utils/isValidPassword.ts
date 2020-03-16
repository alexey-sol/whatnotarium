import HashOptions from "models/HashOptions";
import User from "models/User";
import hashPassword from "utils/hashPassword";

type IsValidPassword = (
    passwordToCheck: string,
    user: User
) => Promise<boolean> | never;

const isValidPassword: IsValidPassword = async function (
    passwordToCheck: string,
    user: User
): Promise<boolean> | never {
    const { hashOptionsId, password } = user;
    const hashOptions = await HashOptions.findById(hashOptionsId);

    if (!hashOptions) {
        return false;
    }
    const {
        hash: hashToCheck
    } = await hashPassword(passwordToCheck, hashOptions);

    return hashToCheck.equals(password);
};

export default isValidPassword;
