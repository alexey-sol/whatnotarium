import DbAsyncQueryPayload from "types/DbAsyncQueryPayload";
import ModelProps from "types/ModelProps";
import PgQuery from "./PgQuery";

class CreateQuery<Type> extends PgQuery<Type> {
    constructor (
        tableName: string,
        queryName = "create"
    ) {
        super(tableName, undefined, queryName);
    }

    async query (
        props: ModelProps
    ): DbAsyncQueryPayload<Type> | never {
        return this.sendQueryAndGetPayload({
            name: this.queryName,
            text: this.getText(props),
            values: this.getValues(props)
        });
    }

    private getText (
        props: ModelProps
    ): string {
        const insertIntoClause = this.createInsertIntoClause(props);
        const valuesClause = this.createValuesClause(props);

        return `
            INSERT INTO ${this.tableName} (
                ${insertIntoClause}
            )
            VALUES (
                ${valuesClause}
            )
            RETURNING *;
        `;
    }

    private createInsertIntoClause (
        props: ModelProps
    ): string {
        return Object
            .keys(props)
            .join(", ");
    }

    private createValuesClause (
        props: ModelProps
    ): string {
        let count = this.offset;
        const values = [];

        for (const _key in props) {
            count++;
            values.push(`$${count}`);
        }

        return values.join(", ");
    }
}

export default CreateQuery;
