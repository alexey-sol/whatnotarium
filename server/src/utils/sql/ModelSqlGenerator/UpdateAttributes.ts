import ModelSqlGenerator from "./ModelSqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";

class UpdateAttributes<InputType> extends ModelSqlGenerator<InputType> {
    generate (
        props: InputType,
        returningFields: string[] = []
    ): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText(props, returningFields),
            values: this.getValues(props)
        };
    }

    protected getText (
        props: InputType,
        returningFields: string[] = []
    ): string {
        const { setClause, andClause } = this.createClauses(props);
        const whereIdElement = this.createWhereAttributesClause(["id"]);
        const returningClause = this.createReturningClause(returningFields);

        return `
            UPDATE "${this.tableName}"
            SET ${setClause}
            ${whereIdElement}
            AND (${andClause})
            ${returningClause};
        `;
    }

    private createClauses (props: InputType): {
        setClause: string;
        andClause: string;
    } {
        let count = this.offset;

        const setClauseRows: string[] = [];
        const andClauseRows: string[] = [];

        for (const key in props) {
            if (Object.prototype.hasOwnProperty.call(props, key) && props[key] !== undefined) {
                count += 1;
                setClauseRows.push(`"${key}" = $${count}`);
                andClauseRows.push(`$${count} IS DISTINCT FROM "${key}"`);
            }
        }

        return {
            setClause: setClauseRows.join(", "),
            andClause: andClauseRows.join(" OR ")
        };
    }
}

export default UpdateAttributes;
