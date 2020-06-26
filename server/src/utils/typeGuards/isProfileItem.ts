import Attributes from "#types/profile/Attributes";
import Item from "#types/profile/Item";

function isProfileItem (
    objectToCheck: Attributes
): objectToCheck is Item {
    const {
        createdAt,
        id,
        name,
        picture,
        updatedAt,
        userId
    } = objectToCheck;

    return (
        createdAt instanceof Date &&
        updatedAt instanceof Date &&
        typeof id === "number" &&
        typeof name === "string" &&
        typeof userId === "number"
        // Buffer.isBuffer(picture) // TODO: it's an optional attr
    );
}

export default isProfileItem;
