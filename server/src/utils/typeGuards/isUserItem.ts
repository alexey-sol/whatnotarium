import Attributes from "#types/user/Attributes";
import Item from "#types/user/Item";
import UserHashOptions from "#types/UserHashOptions";
import UserProfile from "#types/UserProfile";
import isOfType from "#utils/typeGuards/isOfType";

function isUserItem (
    objectToCheck: Attributes
): objectToCheck is Item {
    const {
        createdAt,
        email,
        id,
        hashOptions,
        profile,
        updatedAt
    } = objectToCheck;

    const hashOptionsIsValidIfPassed = (hashOptions)
        ? isOfType<UserHashOptions>(hashOptions, "hash")
        : true;

    const profileIsValidIfPassed = (profile)
        ? isOfType<UserProfile>(profile, "name")
        : true;

    return (
        createdAt instanceof Date &&
        updatedAt instanceof Date &&
        typeof email === "string" &&
        typeof id === "number" &&
        hashOptionsIsValidIfPassed &&
        profileIsValidIfPassed
    );
}

export default isUserItem;
