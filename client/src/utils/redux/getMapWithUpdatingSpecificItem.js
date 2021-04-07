function getMapWithUpdatingSpecificItem (items, { props }) {
    if (!items) {
        return new Map();
    }

    const { id, ...rest } = props;
    const itemsClone = new Map(items);
    const entries = Object.entries(rest);
    const item = itemsClone.get(id);

    if (item) {
        entries.forEach(([key, value]) => {
            item[key] = value;
        });
    }

    return itemsClone;
}

export default getMapWithUpdatingSpecificItem;
