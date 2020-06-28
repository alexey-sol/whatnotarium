import Attributes from "#types/user/Attributes";
import Item from "#types/user/Item";
import UserProfile from "#types/UserProfile";
import isOfType from "#utils/typeGuards/isOfType";

function isUserItem (
    objectToCheck: Attributes
): objectToCheck is Item {
    const {
        createdAt,
        email,
        id,
        password,
        profile,
        updatedAt
    } = objectToCheck;

    const profileIsValid = (profile)
        ? isOfType<UserProfile>(profile, "name")
        : true;

    return (
        createdAt instanceof Date &&
        updatedAt instanceof Date &&
        typeof email === "string" &&
        typeof id === "number" &&
        profileIsValid &&
        Buffer.isBuffer(password)
    );
}

export default isUserItem;
