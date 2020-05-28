import FormattedProps from "#types/post/FormattedProps";
import PostProps from "#types/post/PostProps";

function isPostProps (
    objectToCheck: FormattedProps
): objectToCheck is PostProps {
    const {
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
        typeof body === "string" &&
        typeof id === "number" &&
        typeof title === "string" &&
        typeof userId === "number"
    );
}

export default isPostProps;
