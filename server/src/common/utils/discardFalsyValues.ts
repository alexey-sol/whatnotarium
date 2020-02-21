import Indexer from "types/Indexer";

interface DiscardFalsyValues {
    (object: unknown[]): unknown[];
    (object: Indexer<unknown>): Indexer<unknown>;
}

function discardFalsyValues (
    object: unknown[]
): unknown[];

function discardFalsyValues (
    object: Indexer<unknown>
): Indexer<unknown>;

function discardFalsyValues (
    object: unknown
): unknown[] | Indexer<unknown> {
    if (Array.isArray(object)) {
        return filterOutArray(object);
    } else {
        return filterOutObject(object as Indexer<unknown>);
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
