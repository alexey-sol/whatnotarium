import FormattedProps from "user/model/types/FormattedProps";
import UserProps from "user/model/types/UserProps";

const isUserProps = function (
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
};

export default isUserProps;
