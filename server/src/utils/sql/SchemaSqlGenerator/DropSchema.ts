import SchemaSqlGenerator from "./SchemaSqlGenerator";
import generateId from "#utils/helpers/generateId";

class DropSchemaIfExists extends SchemaSqlGenerator<unknown> {
    constructor (
        schemaName: string,
        queryName = generateId()
    ) {
        super(schemaName, queryName);
    }

    protected getText (): string {
        return `
            DROP SCHEMA IF EXISTS "${this.schemaName}" CASCADE;
        `;
    }
}

export default DropSchemaIfExists;
