import Indexer from "types/Indexer";
import SqlQueryPayload from "types/SqlQueryPayload";
import isObject from "utils/isObject";

abstract class Sql {
    protected offset: number;

    constructor (
        protected tableName: string,
        protected recordId?: string,
        protected queryName?: string
    ) {
        this.tableName = tableName;
        this.offset = (recordId) ? 1 : 0;
    }

    abstract generate (
        props?: Indexer<unknown>
    ): SqlQueryPayload;

    protected getValues (props: Indexer<unknown>): string[];
    protected getValues (props?: unknown[]): string[];
    protected getValues (props?: unknown): string[] {
        const id = this.recordId;
        let values = [];

        if (Array.isArray(props)) {
            values = props;
        } else if (isObject(props)) {
            values = Object.values(props);
        }

        return (id)
            ? [id, ...values]
            : values;
    }
}

export default Sql;
