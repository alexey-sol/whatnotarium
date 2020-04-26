import SqlGenerator from "#types/SqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";
import generateId from "#utils/helpers/generateId";

class DropSchemaIfExists implements SqlGenerator<unknown> {
    constructor (
        private readonly queryName = generateId()
    ) {
        this.queryName = queryName;
    }

    generate (schemaName: string): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText(schemaName)
        };
    }

    private getText (schemaName: string): string {
        return `
            DROP SCHEMA IF EXISTS ${schemaName} CASCADE;
        `;
    }
}

export default DropSchemaIfExists;
