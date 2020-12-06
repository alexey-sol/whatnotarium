import { POST_COMMENTS, POSTS, USERS } from "#utils/const/database/tableNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreatePostCommentsTable extends SchemaSqlGenerator<unknown> {
    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS "${POST_COMMENTS}" (
                "id" SERIAL PRIMARY KEY,
                "text" TEXT NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "postId" INTEGER NOT NULL
                    REFERENCES "${POSTS}" ("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE,
                "userId" INTEGER NOT NULL
                    REFERENCES "${USERS}" ("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );
        `;
    }
}

export default CreatePostCommentsTable;
