import Indexer from "#types/Indexer";

function getObjectValueIgnoringKeyCase (object: Indexer<unknown>, key: string): unknown {
    const foundKey = Object
        .keys(object)
        .find(currentKey => currentKey.toLowerCase() === key.toLowerCase());

    return (foundKey)
        ? object[foundKey]
        : null;
}

export default getObjectValueIgnoringKeyCase;
