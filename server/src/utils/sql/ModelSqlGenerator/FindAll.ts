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

    generate (
        filter?: DbQueryFilter<InputType>,
        returningFields?: string[]
    ): SqlQueryPayload {
        return (filter)
            ? this.createQueryPayloadWithFilter(filter, returningFields)
            : this.createQueryPayload(returningFields);
    }

    private createQueryPayloadWithFilter (
        filter: DbQueryFilter<InputType>,
        returningFields?: string[]
    ): SqlQueryPayload {
        const { where = {} } = filter;
        const fieldValues = Object.values(where);

        return {
            name: this.queryName,
            text: this.getText(filter, returningFields),
            values: this.getValues(fieldValues)
        };
    }

    private createQueryPayload (returningFields?: string[]): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText(undefined, returningFields)
        };
    }

    protected getText (
        filter: DbQueryFilter<InputType> = {},
        returningFields?: string[]
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

        const selectElem = this.createSelectClause(include, returningFields);
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
