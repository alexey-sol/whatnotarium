import Attributes from "#types/userToken/Attributes";
import Item from "#types/userToken/Item";
import UserEmail from "#types/UserEmail";
import isOfType from "#utils/typeGuards/isOfType";

function isUserTokenItem (
    objectToCheck: Attributes
): objectToCheck is Item {
    const {
        createdAt,
        expirationDate,
        id,
        token,
        typeId,
        user,
        userId
    } = objectToCheck;

    const userIsValidIfPassed = (user)
        ? isOfType<UserEmail>(user, "email")
        : true;

    return (
        createdAt instanceof Date &&
        expirationDate instanceof Date &&
        typeof id === "number" &&
        typeof token === "string" &&
        typeof typeId === "number" &&
        typeof userId === "number" &&
        userIsValidIfPassed
    );
}

export default isUserTokenItem;
