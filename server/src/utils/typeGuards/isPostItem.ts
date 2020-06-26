import Attributes from "#types/post/Attributes";
import Author from "#types/Author";
import isOfType from "./isOfType";
import Item from "#types/post/Item";

function isPostItem (
    objectToCheck: Attributes
): objectToCheck is Item {
    const {
        author,
        body,
        createdAt,
        id,
        title,
        updatedAt,
        userId
    } = objectToCheck;

    return (
        createdAt instanceof Date &&
        updatedAt instanceof Date &&
        isOfType<Author>(author, "name") &&
        typeof body === "string" &&
        typeof id === "number" &&
        typeof title === "string" &&
        typeof userId === "number"
    );
}

export default isPostItem;
