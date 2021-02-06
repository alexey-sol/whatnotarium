import { UNPROCESSABLE_ENTITY } from "http-status";

import {
    countRecords,
    createRecord,
    destroyAllRecords,
    findAllRecords,
    findOneRecord,
    updateRecordAttributes
} from "#utils/sql/Model";

import { CreateConfirmTokenTable } from "#utils/sql/SchemaSqlGenerator";
import { INVALID_PROPS } from "#utils/const/validationErrors";
import { CONFIRM_TOKEN } from "#utils/const/database/tableNames";
import Attributes from "#types/confirmToken/Attributes";
import ConfirmTokenError from "#utils/errors/ConfirmTokenError";
import DataOnCreate from "#types/confirmToken/DataOnCreate";
import DataOnUpdate from "#types/confirmToken/DataOnUpdate";
import DbQueryFilter from "#types/DbQueryFilter";
import Include from "#types/Include";
import Item from "#types/confirmToken/Item";
import Model from "#types/Model";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";
import isConfirmTokenItem from "#utils/typeGuards/isConfirmTokenItem";
import separateIncludedAttributes from "#utils/helpers/separateIncludedAttributes";

class ConfirmToken implements Model<DataOnUpdate, ConfirmToken> {
    static tableName = CONFIRM_TOKEN;

    createdAt: Date;
    expirationDate: Date;
    id: number;
    token: string;
    userId: number;

    private constructor (props: Item) {
        this.createdAt = props.createdAt;
        this.expirationDate = props.expirationDate;
        this.id = props.id;
        this.token = props.token;
        this.userId = props.userId;
    }

    static async up (): Promise<void> {
        await generateSqlAndQuery(new CreateConfirmTokenTable());
    }

    static async create (
        props: DataOnCreate,
        include?: Include[]
    ): Promise<ConfirmToken> | never {
        const record = await createRecord<DataOnCreate, Item>(
            CONFIRM_TOKEN,
            props,
            ["id", "createdAt", "expirationDate", "token", "userId"]
        );

        return (include)
            ? ConfirmToken.findById(record.id, include) as Promise<ConfirmToken>
            : ConfirmToken.formatPropsAndInstantiate(record);
    }

    static async destroyAll (
        filter: DbQueryFilter<Attributes>
    ): Promise<number | null> | never {
        if (!filter.where) {
            return null;
        }

        return destroyAllRecords<Attributes, Item>(CONFIRM_TOKEN, filter);
    }

    static async destroyById (
        id: number
    ): Promise<number | null> | never {
        const where = { id };
        return ConfirmToken.destroyAll({ where });
    }

    static async count (
        filter?: DbQueryFilter<Attributes>
    ): Promise<number> | never {
        return countRecords<Attributes>(CONFIRM_TOKEN, filter);
    }

    static async findAll (
        filter?: DbQueryFilter<Attributes>
    ): Promise<ConfirmToken[]> | never {
        const records = await findAllRecords<Attributes, Item>(CONFIRM_TOKEN, filter);

        return records.map(record => ConfirmToken.formatPropsAndInstantiate(
            record,
            filter?.include
        ));
    }

    static async findOne (
        filter: DbQueryFilter<Attributes>
    ): Promise<ConfirmToken | null> | never {
        if (!filter.where) {
            return null;
        }

        const record = await findOneRecord<Attributes, Item>(CONFIRM_TOKEN, filter);

        return (record)
            ? ConfirmToken.formatPropsAndInstantiate(record, filter?.include)
            : null;
    }

    static async findById (
        id: number,
        include?: Include[]
    ): Promise<ConfirmToken | null> | never {
        const where = { id };
        return ConfirmToken.findOne({ include, where });
    }

    async save (): Promise<ConfirmToken> | never {
        return this.updateAttributes(this);
    }

    async updateAttributes (
        props: DataOnUpdate,
        include?: Include[]
    ): Promise<ConfirmToken> | never {
        const updatedProps = {
            ...props,
            updatedAt: new Date()
        };

        const record = await updateRecordAttributes<DataOnUpdate, Item>(
            CONFIRM_TOKEN,
            this.id,
            updatedProps,
            ["id", "createdAt", "expirationDate", "token", "userId"]
        );

        return (include)
            ? ConfirmToken.findById(this.id, include) as Promise<ConfirmToken>
            : ConfirmToken.formatPropsAndInstantiate(record || this);
    }

    static formatPropsAndInstantiate (
        props: Attributes,
        include?: Include[]
    ): ConfirmToken | never {
        const item = (include)
            ? separateIncludedAttributes(props, include)
            : props;

        if (!isConfirmTokenItem(item)) {
            throw new ConfirmTokenError(INVALID_PROPS, UNPROCESSABLE_ENTITY);
        }

        return new ConfirmToken(item);
    }
}

export default ConfirmToken;
