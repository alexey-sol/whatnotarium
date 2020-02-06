import { QueryResult } from "pg";
import ModelProps from "types/ModelProps";
import PgQuery from "./PgQuery";

class UpdateAttributesQuery extends PgQuery {
    constructor (
        tableName: string,
        recordId: string
    ) {
        super(tableName, recordId);
    }

    private getText (
        props: ModelProps
    ): string {
        const setClause = this.createSetClause(props);
        const andClause = this.createAndClause(props);

        return `
            UPDATE
                ${this.tableName}
            SET
                ${setClause}
            WHERE
                id = $1
            AND (
                ${andClause}
            )
            RETURNING
                *;
        `;
    }

    private createSetClause (
        props: ModelProps
    ): string {
        let count = this.offset;
        let clause = "";

        for (const key of Object.keys(props)) {
            count++;
            clause += `${key} = COALESCE($${count}, ${key})`;

            const isLastIteration = this.isLastIteration(props, count);

            if (!isLastIteration) {
                clause += ", ";
            }
        }

        return clause;
    }

    private createAndClause (
        props: ModelProps
    ): string {
        let count = this.offset;
        let clause = "";

        for (const key of Object.keys(props)) {
            count++;
            clause += `$${count} IS DISTINCT FROM ${key}`;

            const isLastIteration = this.isLastIteration(props, count);

            if (!isLastIteration) {
                clause += " OR ";
            }
        }

        return clause;
    }

    async query (
        queryName: string,
        props: ModelProps
    ): Promise<QueryResult> | never {
        try {
            return await this.sendQuery({
                name: queryName,
                text: this.getText(props),
                values: this.getValues(props)
            });
        } catch (error) {
            throw error;
        }
    }
}

export default UpdateAttributesQuery;
