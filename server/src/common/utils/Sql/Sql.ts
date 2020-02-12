import ModelProps from "types/ModelProps";
import SqlQueryPayload from "types/SqlQueryPayload";

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
        props?: ModelProps
    ): SqlQueryPayload;

    protected getValues (
        props: ModelProps = []
    ): string[] {
        const id = this.recordId;
        const values = Object.values(props);

        return (id)
            ? [id, ...values]
            : values;
    }
}

export default Sql;
