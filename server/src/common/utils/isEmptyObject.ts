import ObjectIndexer from "types/ObjectIndexer";

type IsEmptyObject = (
    object: ObjectIndexer<any>
) => boolean;

const isEmptyObject: IsEmptyObject = function (
    object: ObjectIndexer<any>
): boolean {
    return Object.entries(object).length === 0;
};

export default isEmptyObject;
