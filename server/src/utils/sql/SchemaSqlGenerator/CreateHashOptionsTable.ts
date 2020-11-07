import { HASH_OPTIONS, USERS } from "#utils/const/database/tableNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateHashOptionsTable extends SchemaSqlGenerator<unknown> {
    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS "${HASH_OPTIONS}" (
                "id" SERIAL PRIMARY KEY,
                "hash" BYTEA NOT NULL,
                "salt" VARCHAR(255) NOT NULL,
                "digest" VARCHAR(255) NOT NULL,
                "iterations" INTEGER NOT NULL,
                "keyLength" INTEGER NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "userId" INTEGER UNIQUE NOT NULL
                    REFERENCES "${USERS}" ("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );
        `;
    }
}

export default CreateHashOptionsTable;
