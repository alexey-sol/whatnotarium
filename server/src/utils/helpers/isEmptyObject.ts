import Indexer from "#types/Indexer";

function isEmptyObject (
    object: Indexer<unknown>
): boolean {
    return Object.entries(object).length === 0;
}

export default isEmptyObject;
