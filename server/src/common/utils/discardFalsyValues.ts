import ArrayIndexer from "types/ArrayIndexer";
import ObjectIndexer from "types/ObjectIndexer";

interface DiscardFalsyValues {
    (object: ArrayIndexer<any>[]): ArrayIndexer<any>[];
    (object: ObjectIndexer<any>): ObjectIndexer<any>;
}

function discardFalsyValues (
    object: ArrayIndexer<any>[]
): ArrayIndexer<any>[];

function discardFalsyValues (
    object: ObjectIndexer<any>
): ObjectIndexer<any>;

function discardFalsyValues (
    object: any
): ArrayIndexer<any>[] | ObjectIndexer<any> {
    const isArray = Array.isArray(object);

    if (isArray) {
        return filterOutArray(object);
    } else {
        return filterOutObject(object);
    }
}

function filterOutArray (
    array: ArrayIndexer<any>[]
): ArrayIndexer<any>[] {
    return array.filter((element: any) => Boolean(element));
}

function filterOutObject (
    object: ObjectIndexer<any>
): ObjectIndexer<any> {
    const result: ObjectIndexer<any> = {};

    for (const [key, value] of Object.entries(object)) {
        if (value) {
            result[key] = value;
        }
    }

    return result;
}

const typedDiscardFalsyValues: DiscardFalsyValues = discardFalsyValues;

export default typedDiscardFalsyValues;
