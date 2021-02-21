import Attributes from "#types/userToken/Attributes";
import Item from "#types/userToken/Item";

function isUserTokenItem (
    objectToCheck: Attributes
): objectToCheck is Item {
    const {
        createdAt,
        expirationDate,
        id,
        token,
        typeId,
        userId
    } = objectToCheck;

    return (
        createdAt instanceof Date &&
        expirationDate instanceof Date &&
        typeof id === "number" &&
        typeof token === "string" &&
        typeof typeId === "number" &&
        typeof userId === "number"
    );
}

export default isUserTokenItem;
