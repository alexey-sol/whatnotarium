import findRecords from "./findRecords";
import Indexer from "types/Indexer";

async function findOneRecord<OutputType> (
    tableName: string,
    filter?: Indexer<unknown>
): Promise<OutputType | null> | never {
    const records = await findRecords<OutputType>(tableName, filter);
    return records[0];
}

export default findOneRecord;
