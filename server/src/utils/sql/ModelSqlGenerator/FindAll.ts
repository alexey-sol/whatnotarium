import DbQueryFilter from "#types/DbQueryFilter";
import ModelSqlGenerator from "./ModelSqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";
import generateId from "#utils/helpers/generateId";

class FindAll<InputType> extends ModelSqlGenerator<InputType> {
    constructor (
        tableName: string,
        queryName = generateId()
    ) {
        super(tableName, undefined, queryName);
    }

    generate (filter?: DbQueryFilter<InputType>): SqlQueryPayload {
        return (filter)
            ? this.createQueryPayloadWithFilter(filter)
            : this.createQueryPayload();
    }

    private createQueryPayloadWithFilter (
        filter: DbQueryFilter<InputType>
    ): SqlQueryPayload {
        const { where = {} } = filter;
        const fieldValues = Object.values(where);

        return {
            name: this.queryName,
            text: this.getText(filter),
            values: this.getValues(fieldValues)
        };
    }

    private createQueryPayload (): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText()
        };
    }

    protected getText (
        filter: DbQueryFilter<InputType> = {}
    ): string {
        const {
            include,
            limit,
            offset,
            order,
            where = {}
        } = filter;

        const attributes = Object.keys(where);

        const selectElement = this.createSelectClause(include);
        const joinElement = this.createJoinClause(include);
        const whereAttributesElement = this.createWhereAttributesClause(attributes);

        const orderElement = (order)
            ? `ORDER BY ${order}`
            : "";

        const limitElement = (limit)
            ? `LIMIT ${limit}`
            : "";

        const offsetElement = (offset)
            ? `OFFSET ${offset}`
            : "";

        return `
            ${selectElement}
            FROM "${this.tableName}"
            ${joinElement}
            ${whereAttributesElement}
            ${orderElement}
            ${limitElement}
            ${offsetElement};
        `;
    }
}

export default FindAll;
