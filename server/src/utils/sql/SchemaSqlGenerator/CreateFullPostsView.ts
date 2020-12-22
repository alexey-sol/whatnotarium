import { FULL_POSTS_VIEW } from "#utils/const/database/viewNames";
import { POSTS, POST_COMMENTS } from "#utils/const/database/tableNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateFullPostsView extends SchemaSqlGenerator<unknown> {
    protected getText (): string {
        return `
            CREATE OR REPLACE VIEW "${FULL_POSTS_VIEW}" AS
            SELECT
                p."id", p."body", p."title", p."rating", p."userIdsVotedUp", p."viewCount",
                p."userIdsVotedDown", p."createdAt", p."updatedAt", p."userId",
                COALESCE(array_to_json(array_agg(DISTINCT jsonb_build_object(
                    'id', pc."id",
                    'text', pc."text",
                    'createdAt', pc."createdAt",
                    'updatedAt', pc."updatedAt",
                    'userId', pc."userId"
                )) FILTER (WHERE pc."id" IS NOT NULL)), '[]') AS "comments"
            FROM "${POSTS}" AS p
            LEFT JOIN "${POST_COMMENTS}" AS pc ON p."id" = pc."postId"
            GROUP BY p."id";
        `;
    }
}

export default CreateFullPostsView;
