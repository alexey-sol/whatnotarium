import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateSchema extends SchemaSqlGenerator<unknown> {
    protected getText (): string {
        return `
            CREATE SCHEMA "${this.schemaName}";
        `;
    }
}

export default CreateSchema;
