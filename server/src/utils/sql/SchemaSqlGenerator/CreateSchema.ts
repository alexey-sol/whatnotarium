import SchemaSqlGenerator from "./SchemaSqlGenerator";
import generateId from "#utils/helpers/generateId";

class CreateSchema extends SchemaSqlGenerator<unknown> {
    constructor (
        schemaName: string,
        queryName = generateId()
    ) {
        super(schemaName, queryName);
    }

    protected getText (): string {
        return `
            CREATE SCHEMA ${this.schemaName};
        `;
    }
}

export default CreateSchema;
