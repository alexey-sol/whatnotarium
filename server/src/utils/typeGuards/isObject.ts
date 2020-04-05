import Indexer from "#types/Indexer";

function IsObject (
    objectToCheck: unknown
): objectToCheck is Indexer<unknown> {
    return (
        typeof objectToCheck === "object" &&
        (objectToCheck as object).constructor.name === "Object"
    );
}

export default IsObject;
