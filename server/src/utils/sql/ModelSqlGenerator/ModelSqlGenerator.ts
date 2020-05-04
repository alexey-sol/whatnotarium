import DbQueryFilter from "#types/DbQueryFilter";
import SqlGenerator from "#types/SqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";
import isObject from "#utils/typeGuards/isObject";

abstract class ModelSqlGenerator<InputType> implements SqlGenerator<InputType> {
    protected offset: number;

    constructor (
        protected readonly tableName: string,
        protected readonly recordId?: number,
        protected readonly queryName?: string
    ) {
        this.tableName = tableName;
        this.offset = (recordId) ? 1 : 0;
    }

    abstract generate (input?: InputType): SqlQueryPayload;

    protected abstract getText (
        input?: InputType | DbQueryFilter<InputType>
    ): string;

    protected getValues (input: InputType): string[];
    protected getValues (input?: unknown[]): string[];
    protected getValues (input?: unknown): string[] {
        const id = this.recordId;
        let values = [];

        if (Array.isArray(input)) {
            values = input;
        } else if (isObject(input)) {
            values = Object.values(input);
        }

        return (id)
            ? [id, ...values]
            : values;
    }
}

export default ModelSqlGenerator;
