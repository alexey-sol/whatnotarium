import Attributes from "#types/confirmToken/Attributes";
import Item from "#types/confirmToken/Item";

function isConfirmTokenItem (
    objectToCheck: Attributes
): objectToCheck is Item {
    const {
        createdAt,
        expirationDate,
        id,
        token,
        userId
    } = objectToCheck;

    return (
        createdAt instanceof Date &&
        expirationDate instanceof Date &&
        typeof id === "number" &&
        typeof token === "string" &&
        typeof userId === "number"
    );
}

export default isConfirmTokenItem;
