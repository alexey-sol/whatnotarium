import Attributes from "#types/hashOptions/Attributes";
import Item from "#types/hashOptions/Item";

function isHashOptionsItem (
    objectToCheck: Attributes
): objectToCheck is Item {
    const {
        createdAt,
        digest,
        hash,
        id,
        iterations,
        keyLength,
        salt,
        updatedAt,
        userId
    } = objectToCheck;

    return (
        createdAt instanceof Date &&
        updatedAt instanceof Date &&
        typeof digest === "string" &&
        typeof id === "number" &&
        typeof iterations === "number" &&
        typeof keyLength === "number" &&
        typeof salt === "string" &&
        typeof userId === "number" &&
        Buffer.isBuffer(hash)
    );
}

export default isHashOptionsItem;
