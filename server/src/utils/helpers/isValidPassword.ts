import { HASH_OPTIONS } from "#utils/const/database/tableNames";
import User from "#models/User";
import hashPassword from "#utils/helpers/hashPassword";

async function isValidPassword (
    passwordToCheck: string,
    userId: number
): Promise<boolean> | never {
    const user = await User.findById(userId, [{
        as: "hashOptions",
        attributes: ["digest", "hash", "iterations", "keyLength", "salt"],
        referencedKey: "userId",
        ownKey: "id",
        tableName: HASH_OPTIONS
    }]);

    if (!user?.hashOptions) {
        return false;
    }

    const { hash, ...hashOptions } = user.hashOptions;

    const {
        hash: hashToCheck
    } = await hashPassword(passwordToCheck, hashOptions);

    return hashToCheck.equals(hash);
}

export default isValidPassword;
