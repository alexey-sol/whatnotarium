import DbQueryFilter from "#types/DbQueryFilter";
import ModelSqlGenerator from "./ModelSqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";

class FindAll<InputType> extends ModelSqlGenerator<InputType> {
    constructor (
        tableName: string,
        queryName?: string
    ) {
        super(tableName, undefined, queryName);
    }

    generate (
        filter?: DbQueryFilter<InputType>,
        fieldsToSelect?: string[]
    ): SqlQueryPayload {
        return (filter)
            ? this.createQueryPayloadWithFilter(filter, fieldsToSelect)
            : this.createQueryPayload(fieldsToSelect);
    }

    private createQueryPayloadWithFilter (
        filter: DbQueryFilter<InputType>,
        fieldsToSelect?: string[]
    ): SqlQueryPayload {
        const { where = {} } = filter;
        const fieldValues = Object.values(where);

        return {
            name: this.queryName,
            text: this.getText(filter, fieldsToSelect),
            values: this.getValues(fieldValues)
        };
    }

    private createQueryPayload (fieldsToSelect?: string[]): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText(undefined, fieldsToSelect)
        };
    }

    protected getText (
        filter: DbQueryFilter<InputType> = {},
        fieldsToSelect?: string[]
    ): string {
        const {
            include,
            limit,
            offset,
            operators,
            order,
            where = {}
        } = filter;

        const attributes = Object.keys(where);

        const selectElem = this.createSelectClause(include, fieldsToSelect);
        const joinElem = this.createJoinClause(include);
        const whereAttribElem = this.createWhereAttributesClause(attributes, operators, include);

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
            ${selectElem}
            FROM "${this.tableName}"
            ${joinElem}
            ${whereAttribElem}
            ${orderElement}
            ${limitElement}
            ${offsetElement};
        `;
    }
}

export default FindAll;
