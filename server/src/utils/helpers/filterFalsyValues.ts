import Indexer from "#types/Indexer";

function filterFalsyValues (
    object: unknown[]
): unknown[];

function filterFalsyValues (
    object: Indexer<unknown>
): Indexer<unknown>;

function filterFalsyValues (
    object: unknown
): unknown[] | Indexer<unknown> {
    if (Array.isArray(object)) {
        return filterOutArray(object);
    }

    return filterOutObject(object as Indexer<unknown>);
}

export default filterFalsyValues;

function filterOutArray (
    array: unknown[]
): unknown[] {
    return array.filter(Boolean);
}

function filterOutObject (
    object: Indexer<unknown>
): Indexer<unknown> {
    const result: Indexer<unknown> = {};

    for (const [key, value] of Object.entries(object)) {
        if (value) {
            result[key] = value;
        }
    }

    return result;
}
