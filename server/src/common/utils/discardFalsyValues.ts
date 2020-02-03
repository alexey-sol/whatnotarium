import IArrayIndexer from "types/IArrayIndexer";
import IObjectIndexer from "types/IObjectIndexer";

interface IDiscardFalsyValues {
    (object: IArrayIndexer<any>[]): IArrayIndexer<any>[];
    (object: IObjectIndexer<any>): IObjectIndexer<any>;
}

function discardFalsyValues (
    object: IArrayIndexer<any>[]
): IArrayIndexer<any>[];

function discardFalsyValues (
    object: IObjectIndexer<any>
): IObjectIndexer<any>;

function discardFalsyValues (
    object: any
): IArrayIndexer<any>[] | IObjectIndexer<any> {
    const isArray = Array.isArray(object);

    if (isArray) {
        return filterOutArray(object);
    } else {
        return filterOutObject(object);
    }
}

function filterOutArray (
    array: IArrayIndexer<any>[]
): IArrayIndexer<any>[] {
    return array.filter((element: any) => Boolean(element));
}

function filterOutObject (
    object: IObjectIndexer<any>
): IObjectIndexer<any> {
    const result: IObjectIndexer<any> = {};

    for (const [key, value] of Object.entries(object)) {
        if (value) {
            result[key] = value;
        }
    }

    return result;
}

const typedDiscardFalsyValues: IDiscardFalsyValues = discardFalsyValues;

export default typedDiscardFalsyValues;
