import Include from "#types/Include";
import Indexer from "#root/src/types/Indexer";

function separateIncludedAttributes (
    object: Indexer<any>,
    include: Include[]
): Indexer<any> {
    const updatedObject = { ...object };

    include.forEach(({ as, attributes, tableName }) => {
        updatedObject[as] = {};

        attributes.forEach(column => {
            const joinedColumn = `${tableName}_${column}`;

            updatedObject[as][column] = object[joinedColumn];
            delete updatedObject[joinedColumn];
        });
    });

    return updatedObject;
}

export default separateIncludedAttributes;
