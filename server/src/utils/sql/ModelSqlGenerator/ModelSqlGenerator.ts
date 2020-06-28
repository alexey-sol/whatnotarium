import DbQueryFilter from "#types/DbQueryFilter";
import Include from "#types/Include";
import SqlGenerator from "#types/SqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";
import isObject from "#utils/typeGuards/isObject";

abstract class ModelSqlGenerator<InputType> implements SqlGenerator<InputType> {
    protected offset: number;

    constructor (
        protected readonly tableName: string,
        protected readonly recordId?: number,
        protected readonly queryName?: string
    ) {
        this.tableName = tableName;
        this.offset = (recordId) ? 1 : 0;
    }

    abstract generate (input?: InputType): SqlQueryPayload;

    protected abstract getText (
        input?: InputType | DbQueryFilter<InputType>
    ): string;

    protected createSelectClause (
        include?: Include[]
    ): string {
        let selectElement = `SELECT "${this.tableName}".*`;

        if (include) {
            include.forEach(({ attributes, tableName }) => {
                const values = attributes.map(column => {
                    const columnToJoin = `${tableName}"."${column}`;
                    const alias = `${tableName}_${column}`;

                    return `, "${columnToJoin}" as "${alias}"`;
                });

                selectElement += values.join("");
            });
        }

        return selectElement;
    }

    protected createJoinClause (
        include?: Include[]
    ): string {
        let joinElement = "";

        if (include) {
            const values = include.map(({ ownKey, referencedKey, tableName }) => `
                LEFT JOIN "${tableName}"
                ON "${this.tableName}"."${ownKey}" = "${tableName}"."${referencedKey}"
            `);

            joinElement = values.join(" ");
        }

        return joinElement;
    }

    protected createWhereAttributesClause (
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

    protected createWhereIdClause (): string {
        return `WHERE "${this.tableName}"."id" = $1`;
    }

    protected getValues (input: InputType): string[];
    protected getValues (input?: unknown[]): string[];
    protected getValues (input?: unknown): string[] {
        const id = this.recordId;
        let values = [];

        if (Array.isArray(input)) {
            values = input;
        } else if (isObject(input)) {
            values = Object.values(input);
        }

        return (id)
            ? [id, ...values]
            : values;
    }
}

export default ModelSqlGenerator;
