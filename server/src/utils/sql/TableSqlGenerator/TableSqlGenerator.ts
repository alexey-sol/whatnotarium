import SqlGenerator from "#types/SqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";

abstract class TableSqlGenerator<InputType = unknown>
implements SqlGenerator<InputType> {
    constructor (
        protected readonly tableName?: string,
        protected readonly queryName?: string
    ) {
        this.tableName = tableName;
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

export default TableSqlGenerator;
