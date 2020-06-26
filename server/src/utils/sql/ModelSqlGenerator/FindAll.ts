import DbQueryFilter from "#types/DbQueryFilter";
import ModelSqlGenerator from "./ModelSqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";
import generateId from "#utils/helpers/generateId";
import Include from "#root/src/types/Include";

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
            include,
            limit,
            offset,
            order,
            where = {}
        } = filter;

        const attributes = Object.keys(where);

        const selectElement = this.createSelectClause(include);
        const joinElement = this.createJoinClause(include);
        const whereElement = this.createWhereClause(attributes);

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
            ${whereElement}
            ${orderElement}
            ${limitElement}
            ${offsetElement};
        `;
    }

    private createSelectClause (
        include?: Include[]
    ): string {
        let selectElement = `SELECT "${this.tableName}".*`;

        if (include) {
            include.forEach(({ attributes, tableName }) => {
                const values = attributes.map(column => {
                    const columnToJoin = `${tableName}_${column}`;
                    return `, "${tableName}"."${column}" as "${columnToJoin}"`;
                });

                selectElement += values.join("");
            });
        }

        return selectElement;
    }

    private createJoinClause (
        include?: Include[]
    ): string {
        let joinElement = "";

        if (include) {
            const values = include.map(({ ownKey, referencedKey, tableName }) => (
                `LEFT JOIN "${tableName}" ` +
                `ON "${this.tableName}"."${ownKey}" = "${tableName}"."${referencedKey}"`
            ));

            joinElement = values.join(" ");
        }

        return joinElement;
    }

    private createWhereClause (
        attributes: string[]
    ): string {
        let whereElement = "";

        if (attributes.length > 0) {
            let count = this.offset;
            const values = [];

            for (const attribute of attributes) {
                count += 1;
                values.push(`"${this.tableName}"."${attribute}" = $${count}`);
            }

            const where = values.join(" AND ");
            whereElement = `WHERE ${where}`;
        }

        return whereElement;
    }
}

export default FindAll;
