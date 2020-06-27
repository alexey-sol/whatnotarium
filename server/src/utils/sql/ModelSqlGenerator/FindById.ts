import Include from "#types/Include";
import ModelSqlGenerator from "./ModelSqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";
import generateId from "#utils/helpers/generateId";

class FindById extends ModelSqlGenerator<unknown> {
    constructor (
        tableName: string,
        recordId: number,
        queryName = generateId()
    ) {
        super(tableName, recordId, queryName);
    }

    generate (include?: Include[]): SqlQueryPayload {
        return (include)
            ? this.createQueryPayloadWithInclude(include)
            : this.createQueryPayload();
    }

    private createQueryPayloadWithInclude (
        include?: Include[]
    ): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText(include),
            values: this.getValues()
        };
    }

    private createQueryPayload (): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText(),
            values: this.getValues()
        };
    }

    protected getText (include?: Include[]): string {
        const selectElement = this.createSelectClause(include);
        const joinElement = this.createJoinClause(include);
        const whereIdElement = this.createWhereIdClause();

        return `
            ${selectElement}
            FROM "${this.tableName}"
            ${joinElement}
            ${whereIdElement}
        `;
    }
}

export default FindById;
