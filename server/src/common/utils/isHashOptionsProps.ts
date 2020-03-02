import FormattedProps from "models/HashOptions/types/FormattedProps";
import HashOptionsProps from "models/HashOptions/types/HashOptionsProps";

const isHashOptionsProps = function (
    objectToCheck: FormattedProps
): objectToCheck is HashOptionsProps {
    const {
        digest,
        id,
        iterations,
        keyLength,
        salt
    } = objectToCheck;

    return (
        typeof digest === "string" &&
        typeof id === "number" &&
        typeof iterations === "number" &&
        typeof keyLength === "number" &&
        typeof salt === "string"
    );
};

export default isHashOptionsProps;
