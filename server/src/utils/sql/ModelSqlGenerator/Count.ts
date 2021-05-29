import DbQueryFilter from "#types/DbQueryFilter";
import ModelSqlGenerator from "./ModelSqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";

class Count<InputType> extends ModelSqlGenerator<InputType> {
    constructor (
        tableName: string,
        queryName?: string
    ) {
        super(tableName, undefined, queryName);
    }

    generate (filter?: DbQueryFilter<InputType>): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText(filter),
            values: this.getValues(filter?.where)
        };
    }

    protected getText (
        filter: DbQueryFilter<InputType> = {}
    ): string {
        const {
            include,
            limit,
            offset,
            operators,
            where = {}
        } = filter;

        const attributes = Object.keys(where);

        const joinElem = this.createJoinClause(include);
        const whereAttribElem = this.createWhereAttributesClause(attributes, operators, include);

        const limitElement = (limit)
            ? `LIMIT ${limit}`
            : "";

        const offsetElement = (offset)
            ? `OFFSET ${offset}`
            : "";

        return `
            SELECT COUNT(*)
            FROM "${this.tableName}"
            ${joinElem}
            ${whereAttribElem}
            ${limitElement}
            ${offsetElement};
        `;
    }
}

export default Count;
