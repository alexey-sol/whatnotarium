import { CONFIRM, RESET } from "#utils/const/database/userTokenTypeNames";
import { PUBLIC } from "#utils/const/database/schemaNames";
import { USER_TOKEN_TYPES } from "#utils/const/database/tableNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateUserTokenTypesTable extends SchemaSqlGenerator<unknown> {
    constructor () {
        super(PUBLIC, "");
    }

    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS "${USER_TOKEN_TYPES}" (
                "id" SMALLINT PRIMARY KEY,
                "name" VARCHAR(255) UNIQUE NOT NULL
            );

            INSERT INTO "${USER_TOKEN_TYPES}" ("id", "name")
            VALUES (1, "${CONFIRM}"), (2, "${RESET}")
            ON CONFLICT DO NOTHING;
        `;
    }
}

export default CreateUserTokenTypesTable;
