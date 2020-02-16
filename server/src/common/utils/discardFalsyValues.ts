import Indexer from "types/Indexer";

type UnknownObject = Indexer<unknown>;

interface DiscardFalsyValues {
    (object: unknown[]): unknown[];
    (object: UnknownObject): UnknownObject;
}

function discardFalsyValues (
    object: unknown[]
): unknown[];

function discardFalsyValues (
    object: UnknownObject
): UnknownObject;

function discardFalsyValues (
    object: unknown
): unknown[] | UnknownObject {
    if (Array.isArray(object)) {
        return filterOutArray(object);
    } else {
        return filterOutObject(object as UnknownObject);
    }
}

const typedDiscardFalsyValues: DiscardFalsyValues = discardFalsyValues;

export default typedDiscardFalsyValues;

function filterOutArray (
    array: unknown[]
): unknown[] {
    return array.filter((element: unknown) => Boolean(element));
}

function filterOutObject (
    object: UnknownObject
): UnknownObject {
    const result: UnknownObject = {};

    for (const [key, value] of Object.entries(object)) {
        if (value) {
            result[key] = value;
        }
    }

    return result;
}
