import FormattedProps from "#types/user/FormattedProps";
import UserProps from "#types/user/UserProps";

function isUserProps (
    objectToCheck: FormattedProps
): objectToCheck is UserProps {
    const {
        createdAt,
        email,
        id,
        name,
        password,
        updatedAt
    } = objectToCheck;

    return (
        createdAt instanceof Date &&
        updatedAt instanceof Date &&
        typeof email === "string" &&
        typeof id === "number" &&
        typeof name === "string" &&
        Buffer.isBuffer(password)
    );
}

export default isUserProps;
