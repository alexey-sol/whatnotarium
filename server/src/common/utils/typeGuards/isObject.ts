import Indexer from "@common/types/Indexer";

type IsObject = (
    objectToCheck: unknown
) => boolean;

const IsObject = function (
    objectToCheck: unknown
): objectToCheck is Indexer<unknown> {
    return (
        typeof objectToCheck === "object" &&
        (objectToCheck as object).constructor.name === "Object"
    );
};

export default IsObject;
