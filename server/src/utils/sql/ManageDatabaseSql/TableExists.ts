import SqlGenerator from "#types/SqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";
import generateId from "#utils/helpers/generateId";

interface Props {
    schemaName: string;
    tableName: string;
}

class TableExists implements SqlGenerator<unknown> {
    constructor (
        private readonly queryName = generateId()
    ) {
        this.queryName = queryName;
    }

    generate (props: Props): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText(props)
        };
    }

    private getText (props: Props): string {
        const { schemaName, tableName } = props;
        return `SELECT to_regclass('${schemaName}.${tableName}');`;
    }
}

export default TableExists;
