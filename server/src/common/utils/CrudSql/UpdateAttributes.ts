import CrudSql from "./CrudSql";
import Indexer from "types/Indexer";
import SqlQueryPayload from "types/SqlQueryPayload";
import generateId from "utils/generateId";

class UpdateAttributes extends CrudSql {
    constructor (
        tableName: string,
        recordId: number,
        queryName = generateId()
    ) {
        super(tableName, recordId, queryName);
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
        const { setClause, andClause } = this.createClauses(props);

        return `
            UPDATE ${this.tableName}
            SET ${setClause}
            WHERE id = $1
            AND (${andClause})
            RETURNING *;
        `;
    }

    private createClauses (props: Indexer<unknown>): {
        setClause: string;
        andClause: string;
    } {
        let count = this.offset;

        const setClauseRows: string[] = [];
        const andClauseRows: string[] = [];

        for (const key in props) {
            count++;
            setClauseRows.push(`${key} = COALESCE($${count}, ${key})`);
            andClauseRows.push(`$${count} IS DISTINCT FROM ${key}`);
        }

        return {
            setClause: setClauseRows.join(", "),
            andClause: andClauseRows.join(" OR ")
        };
    }
}

export default UpdateAttributes;
