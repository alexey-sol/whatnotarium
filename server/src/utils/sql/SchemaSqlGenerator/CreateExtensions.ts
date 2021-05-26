import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateExtensions extends SchemaSqlGenerator<unknown> {
    protected getText (): string {
        return `
            CREATE EXTENSION IF NOT EXISTS pg_trgm;
        `;
    }
}

export default CreateExtensions;
