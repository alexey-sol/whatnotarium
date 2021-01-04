import DbQueryFilter from "#types/DbQueryFilter";
import ModelSqlGenerator from "./ModelSqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";
import generateId from "#utils/helpers/generateId";

class Count<InputType> extends ModelSqlGenerator<InputType> {
    constructor (
        tableName: string,
        queryName = generateId()
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
        const { groupBy, where } = filter;
        const attributes = Object.keys(where || {});
        const whereAttributesElement = this.createWhereAttributesClause(attributes);

        const groupByElement = (groupBy)
            ? `GROUP BY "${groupBy}"`
            : "";

        return `
            SELECT COUNT(*)
            FROM "${this.tableName}"
            ${whereAttributesElement}
            ${groupByElement};
        `;
    }
}

export default Count;
