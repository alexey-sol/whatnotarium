import { FULL_POSTS_VIEW } from "#utils/const/database/viewNames";
import { POSTS, POST_COMMENTS, POST_LIKES } from "#utils/const/database/tableNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateFullPostsView extends SchemaSqlGenerator<unknown> {
    protected getText (): string {
        return `
            CREATE OR REPLACE VIEW "${FULL_POSTS_VIEW}" AS
            SELECT
                p."id", p."body", p."title", p."createdAt", p."updatedAt", p."userId",
                array_to_json(array_agg(DISTINCT jsonb_build_object(
                    'count', pl."count",
                    'userId', pl."userId"
                )) FILTER (WHERE pl."id" IS NOT NULL)) AS "likes",
                array_to_json(array_agg(DISTINCT jsonb_build_object(
                    'id', pc."id",
                    'text', pc."text",
                    'createdAt', pc."createdAt",
                    'updatedAt', pc."updatedAt",
                    'userId', pl."userId"
                )) FILTER (WHERE pc."id" IS NOT NULL)) AS "comments"
            FROM "${POSTS}" AS p
            LEFT JOIN "${POST_LIKES}" AS pl ON p."id" = pl."postId"
            LEFT JOIN "${POST_COMMENTS}" AS pc ON p."id" = pc."postId"
            GROUP BY p."id";
        `;
    }
}

export default CreateFullPostsView;
