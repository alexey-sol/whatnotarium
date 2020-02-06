import { QueryResult } from "pg";
import DbQuery from "types/DbQuery";
import ModelProps from "types/ModelProps";
import makeDbQuery from "utils/makeDbQuery";

class UpdateAttributesQuery implements DbQuery {
    private offset = 1;

    private isLastIteration (
        props: ModelProps,
        count: number
    ): boolean {
        return count === Object.keys(props).length + this.offset;
    }

    private getText (
        props: ModelProps
    ): string {
        const setClauseContent = this.createSetClauseContent(props);
        const andClauseContent = this.createAndClauseContent(props);

        return `
            UPDATE
                users
            SET
                ${setClauseContent}
            WHERE
                id = $1
            AND (
                ${andClauseContent}
            )
            RETURNING
                *;
        `;
    }

    private createSetClauseContent (
        props: ModelProps
    ) {
        let count = this.offset;
        let setClauseContent = "";

        for (const key of Object.keys(props)) {
            count++;
            setClauseContent += `${key} = COALESCE($${count}, ${key})`;

            const isLastIteration = this.isLastIteration(props, count);

            if (!isLastIteration) {
                setClauseContent += ", ";
            }
        }

        return setClauseContent;
    }

    private createAndClauseContent (
        props: ModelProps
    ) {
        let count = this.offset;
        let andClauseContent = "";

        for (const key of Object.keys(props)) {
            count++;
            andClauseContent += `$${count} IS DISTINCT FROM ${key}`;

            const isLastIteration = this.isLastIteration(props, count);

            if (!isLastIteration) {
                andClauseContent += " OR ";
            }
        }

        return andClauseContent;
    }

    private getValues (
        id: string,
        props: ModelProps
    ): string[] {
        const values = Object.values(props);
        return [id, ...values];
    }

    async query (
        id: string,
        props: ModelProps
    ): Promise<QueryResult> | never {
        try {
            const queryResult = await makeDbQuery(
                "update-attributes",
                this.getText(props),
                this.getValues(id, props)
            );

            return queryResult;
        } catch (error) {
            throw error;
        }
    }
}

export default UpdateAttributesQuery;
