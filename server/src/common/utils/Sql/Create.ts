import ModelProps from "types/ModelProps";
import Sql from "./Sql";
import SqlQueryPayload from "types/SqlQueryPayload";

class Create extends Sql {
    constructor (
        tableName: string,
        queryName = "create"
    ) {
        super(tableName, undefined, queryName);
    }

    generate (
        props: ModelProps
    ): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText(props),
            values: this.getValues(props)
        };
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

export default Create;
