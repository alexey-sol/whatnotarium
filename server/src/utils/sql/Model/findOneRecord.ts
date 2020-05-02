import DbQueryFilter from "#types/DbQueryFilter";
import findAllRecords from "./findAllRecords";

async function findOneRecord<WhereType, OutputType> (
    tableName: string,
    filter: DbQueryFilter<WhereType>
): Promise<OutputType | null> | never {
    const filterWithLimit = {
        ...filter,
        limit: 1
    };

    const records = await findAllRecords<WhereType, OutputType>(
        tableName,
        filterWithLimit
    );

    return records[0];
}

export default findOneRecord;
