import CrudSql from "./CrudSql";
import SqlQueryPayload from "#types/SqlQueryPayload";
import generateId from "#utils/helpers/generateId";

class Find<FilterType> extends CrudSql<FilterType> {
    constructor (
        tableName: string,
        queryName = generateId()
    ) {
        super(tableName, undefined, queryName);
    }

    generate (filter?: FilterType): SqlQueryPayload {
        return (filter)
            ? this.createQueryPayloadWithFilter(filter)
            : this.createQueryPayloadWithoutFilter();
    }

    private createQueryPayloadWithFilter (
        filter: FilterType
    ): SqlQueryPayload {
        const fieldNames = Object.keys(filter);
        const fieldValues = Object.values(filter);

        return {
            name: this.queryName,
            text: this.getText(fieldNames),
            values: this.getValues(fieldValues)
        };
    }

    private createQueryPayloadWithoutFilter (): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText()
        };
    }

    private getText (fieldNames?: string[]): string {
        let whereElement = "";
        let orderElement = "";

        if (fieldNames) {
            const whereClause = this.createWhereClause(fieldNames);
            whereElement += `WHERE ${whereClause}`;
        } else {
            orderElement += "ORDER BY id ASC";
        }

        return `
            SELECT *
            FROM ${this.tableName}
            ${whereElement}
            ${orderElement};
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

export default Find;
