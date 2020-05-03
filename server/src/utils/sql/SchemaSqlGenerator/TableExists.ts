import SchemaSqlGenerator from "./SchemaSqlGenerator";
import generateId from "#utils/helpers/generateId";

class TableExists extends SchemaSqlGenerator<string> {
    constructor (
        schemaName: string,
        queryName = generateId()
    ) {
        super(schemaName, queryName);
    }

    protected getText (tableName: string): string {
        return `SELECT to_regclass('${this.schemaName}.${tableName}');`;
    }
}

export default TableExists;
