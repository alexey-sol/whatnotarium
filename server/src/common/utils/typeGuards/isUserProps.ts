import FormattedProps from "@user/model/types/FormattedProps";
import UserProps from "@user/model/types/UserProps";

const isUserProps = function (
    objectToCheck: FormattedProps
): objectToCheck is UserProps {
    const {
        email,
        hashOptionsId,
        id,
        name,
        password
    } = objectToCheck;

    return (
        typeof email === "string" &&
        typeof hashOptionsId === "number" &&
        typeof id === "number" &&
        typeof name === "string" &&
        Buffer.isBuffer(password)
    );
};

export default isUserProps;
