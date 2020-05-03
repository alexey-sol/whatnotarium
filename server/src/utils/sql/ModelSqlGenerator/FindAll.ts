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
            : this.createQueryPayloadWithoutFilter();
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

    private createQueryPayloadWithoutFilter (): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText()
        };
    }

    protected getText (
        filter: DbQueryFilter<InputType> = {}
    ): string {
        const {
            limit,
            offset,
            order,
            where = {}
        } = filter;

        const fieldNames = Object.keys(where);
        let whereElement = "";

        if (fieldNames?.length) {
            const whereClause = this.createWhereClause(fieldNames);
            whereElement += `WHERE ${whereClause}`;
        }

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
            SELECT *
            FROM ${this.tableName}
            ${whereElement}
            ${orderElement}
            ${limitElement}
            ${offsetElement};
        `;
    }

    private createWhereClause (
        fieldNames: string[]
    ): string {
        let count = this.offset;
        const values = [];

        for (const fieldName of fieldNames) {
            count += 1;
            values.push(`${fieldName} = $${count}`);
        }

        return values.join(", ");
    }
}

export default FindAll;
