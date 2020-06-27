import ModelSqlGenerator from "./ModelSqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";
import generateId from "#utils/helpers/generateId";

class UpdateAttributes<InputType> extends ModelSqlGenerator<InputType> {
    constructor (
        tableName: string,
        recordId: number,
        queryName = generateId()
    ) {
        super(tableName, recordId, queryName);
    }

    generate (
        props: InputType
    ): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText(props),
            values: this.getValues(props)
        };
    }

    protected getText (
        props: InputType
    ): string {
        const { setClause, andClause } = this.createClauses(props);
        const whereIdElement = this.createWhereIdClause();

        return `
            UPDATE ${this.tableName}
            SET ${setClause}
            ${whereIdElement}
            AND (${andClause})
            RETURNING *;
        `;
    }

    private createClauses (props: InputType): {
        setClause: string;
        andClause: string;
    } {
        let count = this.offset;

        const setClauseRows: string[] = [];
        const andClauseRows: string[] = [];

        for (const key in props) {
            if (key) {
                count += 1;
                setClauseRows.push(`"${key}" = COALESCE($${count}, "${key}")`);
                andClauseRows.push(`$${count} IS DISTINCT FROM "${key}"`);
            }
        }

        return {
            setClause: setClauseRows.join(", "),
            andClause: andClauseRows.join(" OR ")
        };
    }
}

export default UpdateAttributes;
