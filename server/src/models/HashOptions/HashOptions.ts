import { UNPROCESSABLE_ENTITY } from "http-status";

import {
    createRecord,
    destroyRecordById,
    findAllRecords,
    findOneRecord,
    findRecordById,
    updateRecordAttributes
} from "#utils/sql/Model";

import { CreateHashOptionsTable } from "#utils/sql/SchemaSqlGenerator";
import { HASH_OPTIONS } from "#utils/const/database/tableNames";
import { INVALID_PROPS } from "#utils/const/validationErrors";
import Attributes from "#types/hashOptions/Attributes";
import DbQueryFilter from "#types/DbQueryFilter";
import HashOptionsError from "#utils/errors/HashOptionsError";
import Item from "#types/hashOptions/Item";
import Model from "#types/Model";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";
import isHashOptionsItem from "#utils/typeGuards/isHashOptionsItem";

class HashOptions implements Model<Attributes, HashOptions> {
    static tableName = HASH_OPTIONS;

    createdAt: Date;
    digest: string;
    id: number;
    iterations: number;
    keyLength: number;
    salt: string;
    updatedAt: Date;
    userId: number;

    private constructor (props: Item) {
        this.createdAt = props.createdAt;
        this.digest = props.digest;
        this.id = props.id;
        this.iterations = props.iterations;
        this.keyLength = props.keyLength;
        this.salt = props.salt;
        this.updatedAt = props.updatedAt;
        this.userId = props.userId;
    }

    static async up (): Promise<void> {
        await generateSqlAndQuery(new CreateHashOptionsTable());
    }

    static async create (
        props: Attributes
    ): Promise<HashOptions> | never {
        const record = await createRecord<Attributes, Item>(
            HASH_OPTIONS,
            props
        );

        return HashOptions.formatPropsAndInstantiate(record);
    }

    static async destroyById (
        id: number
    ): Promise<number | null> | never {
        return destroyRecordById<Item>(HASH_OPTIONS, id);
    }

    static async findAll (
        filter?: DbQueryFilter<Attributes>
    ): Promise<HashOptions[]> | never {
        const records = await findAllRecords<Attributes, Item>(
            HASH_OPTIONS,
            filter
        );

        return records.map(record => {
            return HashOptions.formatPropsAndInstantiate(record);
        });
    }

    static async findOne (
        filter: DbQueryFilter<Attributes>
    ): Promise<HashOptions | null> | never {
        if (!filter.where) {
            return null;
        }

        const record = await findOneRecord<Attributes, Item>(
            HASH_OPTIONS,
            filter
        );

        return (record)
            ? HashOptions.formatPropsAndInstantiate(record)
            : null;
    }

    static async findById (
        id: number
    ): Promise<HashOptions | null> | never {
        const record = await findRecordById<Item>(HASH_OPTIONS, id);

        return (record)
            ? HashOptions.formatPropsAndInstantiate(record)
            : null;
    }

    async save (): Promise<HashOptions> | never {
        return this.updateAttributes(this);
    }

    async updateAttributes (
        props: Attributes
    ): Promise<HashOptions> | never {
        const updatedProps = {
            ...props,
            updatedAt: new Date()
        };

        const record = await updateRecordAttributes<Attributes, Item>(
            HASH_OPTIONS,
            this.id,
            updatedProps
        );

        return HashOptions.formatPropsAndInstantiate(record);
    }

    static formatPropsAndInstantiate (
        props: Attributes
    ): HashOptions | never {
        if (!isHashOptionsItem(props)) {
            throw new HashOptionsError(INVALID_PROPS, UNPROCESSABLE_ENTITY);
        }

        return new HashOptions(props);
    }
}

export default HashOptions;
