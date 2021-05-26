import SchemaSqlGenerator from "./SchemaSqlGenerator";

class DropSchemaIfExists extends SchemaSqlGenerator<unknown> {
    protected getText (): string {
        return `
            DROP SCHEMA IF EXISTS "${this.schemaName}" CASCADE;
        `;
    }
}

export default DropSchemaIfExists;
