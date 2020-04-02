import Indexer from "@common/types/Indexer";

interface FilterFalsyValues {
    (object: unknown[]): unknown[];
    (object: Indexer<unknown>): Indexer<unknown>;
}

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
    } else {
        return filterOutObject(object as Indexer<unknown>);
    }
}

const typedFilterFalsyValues: FilterFalsyValues = filterFalsyValues;

export default typedFilterFalsyValues;

function filterOutArray (
    array: unknown[]
): unknown[] {
    return array.filter((element: unknown) => Boolean(element));
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
