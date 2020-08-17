import _ from "lodash";

function convertItemsArrayToObject (items = [], byKey = "id") {
    return _.mapKeys(items, byKey);
}

export default convertItemsArrayToObject;
