import CrudSql from "./CrudSql";
import Indexer from "@common/types/Indexer";
import SqlQueryPayload from "@common/types/SqlQueryPayload";
import generateId from "@common/utils/helpers/generateId";

class Create extends CrudSql {
    constructor (
        tableName: string,
        queryName = generateId()
    ) {
        super(tableName, undefined, queryName);
    }

    generate (
        props: Indexer<unknown>
    ): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText(props),
            values: this.getValues(props)
        };
    }

    private getText (
        props: Indexer<unknown>
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
        props: Indexer<unknown>
    ): string {
        return Object
            .keys(props)
            .join(", ");
    }

    private createValuesClause (
        props: Indexer<unknown>
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
