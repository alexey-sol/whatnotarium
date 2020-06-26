import Attributes from "#types/user/Attributes";
import Item from "#types/user/Item";

function isUserItem (
    objectToCheck: Attributes
): objectToCheck is Item {
    const {
        createdAt,
        email,
        id,
        password,
        updatedAt
    } = objectToCheck;

    return (
        createdAt instanceof Date &&
        updatedAt instanceof Date &&
        typeof email === "string" &&
        typeof id === "number" &&
        Buffer.isBuffer(password)
    );
}

export default isUserItem;
