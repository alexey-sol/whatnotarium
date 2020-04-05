import FormattedProps from "#types/hashOptions/FormattedProps";
import HashOptionsProps from "#types/hashOptions/HashOptionsProps";

function isHashOptionsProps (
    objectToCheck: FormattedProps
): objectToCheck is HashOptionsProps {
    const {
        digest,
        id,
        iterations,
        keyLength,
        salt,
        userId
    } = objectToCheck;

    return (
        typeof digest === "string" &&
        typeof id === "number" &&
        typeof iterations === "number" &&
        typeof keyLength === "number" &&
        typeof salt === "string" &&
        typeof userId === "number"
    );
}

export default isHashOptionsProps;
