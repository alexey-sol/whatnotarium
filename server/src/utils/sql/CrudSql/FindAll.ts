import CrudSql from "./CrudSql";
import DbQueryFilter from "#types/DbQueryFilter";
import SqlQueryPayload from "#types/SqlQueryPayload";
import generateId from "#utils/helpers/generateId";

class FindAll<WhereType> extends CrudSql<WhereType> {
    constructor (
        tableName: string,
        queryName = generateId()
    ) {
        super(tableName, undefined, queryName);
    }

    generate (filter?: DbQueryFilter<WhereType>): SqlQueryPayload {
        return (filter)
            ? this.createQueryPayloadWithFilter(filter)
            : this.createQueryPayloadWithoutFilter();
    }

    private createQueryPayloadWithFilter (
        filter: DbQueryFilter<WhereType>
    ): SqlQueryPayload {
        const {
            limit,
            offset,
            order,
            where = {}
        } = filter;

        const fieldNames = Object.keys(where);
        const fieldValues = Object.values(where);

        return {
            name: this.queryName,
            text: this.getText(fieldNames, order, limit, offset),
            values: this.getValues(fieldValues)
        };
    }

    private createQueryPayloadWithoutFilter (): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText()
        };
    }

    private getText (
        fieldNames?: string[],
        order?: string,
        limit?: number,
        offset?: number
    ): string {
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
