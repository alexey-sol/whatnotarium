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
        isApproved,
        isFrozen,
        rating,
        title,
        updatedAt,
        userId,
        userIdsVotedDown,
        userIdsVotedUp,
        viewCount
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
        typeof isApproved === "boolean" &&
        typeof isFrozen === "boolean" &&
        typeof rating === "number" &&
        typeof title === "string" &&
        typeof userId === "number" &&
        typeof viewCount === "number" &&
        comments instanceof Array &&
        userIdsVotedDown instanceof Array &&
        userIdsVotedUp instanceof Array
    );
}

export default isPostItem;
