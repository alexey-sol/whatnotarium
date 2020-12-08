import Attributes from "#types/post/Attributes";
import UserProfile from "#types/UserProfile";
import isOfType from "./isOfType";
import Item from "#types/post/Item";

function isPostItem (
    objectToCheck: Attributes
): objectToCheck is Item {
    const {
        author,
        body,
        comments,
        createdAt,
        id,
        likes,
        title,
        updatedAt,
        userId
    } = objectToCheck;

    const authorIsValid = (author)
        ? isOfType<UserProfile>(author, "name")
        : true;

    return (
        createdAt instanceof Date &&
        updatedAt instanceof Date &&
        authorIsValid &&
        typeof body === "string" &&
        typeof id === "number" &&
        typeof title === "string" &&
        typeof userId === "number" &&
        comments instanceof Array &&
        likes instanceof Array
    );
}

export default isPostItem;
