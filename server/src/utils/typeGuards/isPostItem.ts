import Attributes from "#types/post/Attributes";
import Profile from "#types/Profile";
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

    const authorIsValid = (author)
        ? isOfType<Profile>(author, "name")
        : true;

    return (
        createdAt instanceof Date &&
        updatedAt instanceof Date &&
        authorIsValid &&
        typeof body === "string" &&
        typeof id === "number" &&
        typeof title === "string" &&
        typeof userId === "number"
    );
}

export default isPostItem;
