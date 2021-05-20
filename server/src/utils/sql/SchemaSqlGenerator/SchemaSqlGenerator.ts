import SqlGenerator from "#types/SqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";

abstract class SchemaSqlGenerator<InputType = unknown>
implements SqlGenerator<InputType> {
    constructor (
        protected readonly schemaName?: string,
        protected readonly queryName?: string
    ) {
        this.schemaName = schemaName;
        this.queryName = queryName;
    }

    generate (input?: InputType): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText(input)
        };
    }

    protected abstract getText (input?: InputType): string;
}

export default SchemaSqlGenerator;
