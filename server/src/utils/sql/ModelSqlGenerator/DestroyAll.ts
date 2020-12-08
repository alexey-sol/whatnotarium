import DbQueryFilter from "#types/DbQueryFilter";
import ModelSqlGenerator from "./ModelSqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";
import generateId from "#utils/helpers/generateId";

class DestroyAll<InputType> extends ModelSqlGenerator<InputType> {
    constructor (
        tableName: string,
        queryName = generateId()
    ) {
        super(tableName, undefined, queryName);
    }

    generate (filter?: DbQueryFilter<InputType>): SqlQueryPayload {
        const fieldValues = Object.values(filter?.where || {});

        return {
            name: this.queryName,
            text: this.getText(filter),
            values: this.getValues(fieldValues)
        };
    }

    protected getText (
        filter: DbQueryFilter<InputType> = {}
    ): string {
        const attributes = Object.keys(filter.where || {});
        const whereAttributesElement = this.createWhereAttributesClause(attributes);

        return `
            DELETE FROM "${this.tableName}"
            ${whereAttributesElement}
            RETURNING *;
        `;
    }
}

export default DestroyAll;
