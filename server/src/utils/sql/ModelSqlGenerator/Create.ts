import ModelSqlGenerator from "./ModelSqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";
import generateId from "#utils/helpers/generateId";

class Create<InputType> extends ModelSqlGenerator<InputType> {
    constructor (
        tableName: string,
        queryName = generateId()
    ) {
        super(tableName, undefined, queryName);
    }

    generate (
        props: InputType
    ): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText(props),
            values: this.getValues(props)
        };
    }

    protected getText (
        props: InputType
    ): string {
        const insertIntoClause = this.createInsertIntoClause(props);
        const valuesClause = this.createValuesClause(props);

        return `
            INSERT INTO "${this.tableName}" (
                ${insertIntoClause}
            )
            VALUES (
                ${valuesClause}
            )
            RETURNING *;
        `;
    }

    private createInsertIntoClause (
        props: InputType
    ): string {
        return Object
            .keys(props)
            .map(prop => `"${prop}"`)
            .join(", ");
    }

    private createValuesClause (
        props: InputType
    ): string {
        let count = this.offset;
        const values = [];

        for (const key in props) {
            if (Object.prototype.hasOwnProperty.call(props, key)) {
                count += 1;
                values.push(`$${count}`);
            }
        }

        return values.join(", ");
    }
}

export default Create;
