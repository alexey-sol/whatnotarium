import Indexer from "types/Indexer";

type IsEmptyObject = (
    object: Indexer<unknown>
) => boolean;

const isEmptyObject: IsEmptyObject = function (
    object: Indexer<unknown>
): boolean {
    return Object.entries(object).length === 0;
};

export default isEmptyObject;
