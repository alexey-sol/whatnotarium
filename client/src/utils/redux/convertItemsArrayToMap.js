function convertItemsArrayToMap (items = [], byKey = "id") {
    return new Map(items.map(item => [
        item[byKey],
        item
    ]));
}

export default convertItemsArrayToMap;
