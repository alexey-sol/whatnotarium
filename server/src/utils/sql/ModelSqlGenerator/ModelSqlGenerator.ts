import {
    $and,
    $eq,
    $ilike,
    $like,
    $or
} from "#utils/const/database/modelOperators";

import DbQueryFilter from "#types/DbQueryFilter";
import Include from "#types/Include";
import Operators from "#types/Operators";
import SqlGenerator from "#types/SqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";
import isObject from "#utils/typeGuards/isObject";

interface MatchedAttribute {
    attribute: string;
    tableName: string;
}

abstract class ModelSqlGenerator<InputType> implements SqlGenerator<InputType> {
    protected offset: number;

    constructor (
        protected readonly tableName: string,
        protected readonly recordId?: number,
        protected readonly queryName?: string
    ) {
        this.tableName = tableName;
        this.offset = (recordId) ? 1 : 0;
    }

    abstract generate (
        input?: InputType,
        returningFields?: string[]
    ): SqlQueryPayload;

    protected abstract getText (
        input?: InputType | DbQueryFilter<InputType>,
        returningFields?: string[]
    ): string;

    protected createSelectClause (
        include?: Include[]
    ): string {
        let selectElement = `SELECT "${this.tableName}".*`;

        if (include) {
            include.forEach(({ attributes, tableName }) => {
                const values = attributes.map(column => {
                    const columnToJoin = `${tableName}"."${column}`;
                    const alias = `${tableName}_${column}`;

                    return `, "${columnToJoin}" as "${alias}"`;
                });

                selectElement += values.join("");
            });
        }

        return selectElement;
    }

    protected createJoinClause (
        include?: Include[]
    ): string {
        let joinElement = "";

        if (include) {
            const values = include.map(({ ownKey, referencedKey, tableName }) => `
                LEFT JOIN "${tableName}"
                ON "${this.tableName}"."${ownKey}" = "${tableName}"."${referencedKey}"
            `);

            joinElement = values.join(" ");
        }

        return joinElement;
    }

    protected createWhereAttributesClause (
        attributes: string[],
        operators: Operators = {},
        include?: Include[]
    ): string {
        let whereElement = "";

        const { matchingOp = $eq, conjunctionOp = $and } = operators;
        const $match = this.getOp(matchingOp);
        const $conj = this.getOp(conjunctionOp);

        if (attributes.length > 0) {
            const normalizedAttributes = this.normalizeAttributes(attributes, include);
            const values = [];
            let count = 0;

            for (const attribute of normalizedAttributes) {
                count += 1;
                values.push(`${attribute} ${$match} $${count}`);
            }

            const where = values.join(` ${$conj} `);
            whereElement = `WHERE ${where}`;
        }

        return whereElement;
    }

    private getOp (
        op: typeof $and | typeof $eq | typeof $ilike | typeof $like | typeof $or
    ): string {
        switch (op) {
            case $eq:
                return "=";
            default:
                return op.slice(1).toUpperCase();
        }
    }

    private normalizeAttributes (
        attributes: string[],
        include?: Include[]
    ): string[] {
        const allAttributesFromInclude: MatchedAttribute[] = [];
        const foreignAttributes: MatchedAttribute[] = [];
        const ownAttributes: MatchedAttribute[] = [];

        if (include) {
            include.forEach(includeItem => {
                const { attributes: attributesToInclude, tableName } = includeItem;

                attributesToInclude.forEach(attribute => {
                    allAttributesFromInclude.push({
                        attribute,
                        tableName
                    });
                });
            });
        }

        attributes.forEach(attribute => {
            const foreignAttribute = allAttributesFromInclude
                .find(item => item.attribute === attribute);

            if (foreignAttribute) {
                foreignAttributes.push({
                    attribute,
                    tableName: foreignAttribute.tableName
                });
            } else {
                ownAttributes.push({
                    attribute,
                    tableName: this.tableName
                });
            }
        });

        return [...ownAttributes, ...foreignAttributes]
            .map(({ attribute, tableName }) => `"${tableName}"."${attribute}"`);
    }

    protected createReturningClause (returningFields?: string[]): string {
        const fields = returningFields
            ?.map(field => `"${field}"`)
            .join(", ") || "*";

        return `RETURNING ${fields}`;
    }

    protected getValues (input: InputType): string[];
    protected getValues (input?: unknown[]): string[];
    protected getValues (input?: unknown): string[] {
        const id = this.recordId;
        let values = [];

        if (Array.isArray(input)) {
            values = input;
        } else if (isObject(input)) {
            values = Object.values(input);
        }

        return (id)
            ? [id, ...values]
            : values;
    }
}

export default ModelSqlGenerator;
