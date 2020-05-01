import findRecords from "./findRecords";

async function findOneRecord<FilterType, OutputType> (
    tableName: string,
    filter: FilterType
): Promise<OutputType | null> | never {
    const records = await findRecords<FilterType, OutputType>(
        tableName,
        filter
    );

    return records[0];
}

export default findOneRecord;
