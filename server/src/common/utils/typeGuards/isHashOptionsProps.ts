import FormattedProps from "hashOptions/model/types/FormattedProps";
import HashOptionsProps from "hashOptions/model/types/HashOptionsProps";

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
