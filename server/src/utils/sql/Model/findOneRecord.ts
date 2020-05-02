import DbQueryFilter from "#types/DbQueryFilter";
import findAllRecords from "./findAllRecords";

async function findOneRecord<Props, OutputType> (
    tableName: string,
    filter: DbQueryFilter<Props>
): Promise<OutputType | null> | never {
    const filterWithLimit = {
        ...filter,
        limit: 1
    };

    const records = await findAllRecords<Props, OutputType>(
        tableName,
        filterWithLimit
    );

    return records[0];
}

export default findOneRecord;
