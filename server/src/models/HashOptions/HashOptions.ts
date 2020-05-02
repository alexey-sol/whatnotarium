import { UNPROCESSABLE_ENTITY } from "http-status";

import {
    createRecord,
    destroyRecordById,
    findAllRecords,
    findOneRecord,
    findRecordById,
    updateRecordAttributes
} from "#utils/sql/Model";

import { CreateHashOptionsTable } from "#utils/sql/CreateTableSql";
import { HASH_OPTIONS } from "#utils/const/dbTableNames";
import { INVALID_PROPS } from "#utils/const/validationErrors";
import DbQueryFilter from "#types/DbQueryFilter";
import FormattedProps from "#types/hashOptions/FormattedProps";
import Formatter from "#utils/formatters/ModelFormatter/HashOptionsFormatter";
import HashOptionsError from "#utils/errors/HashOptionsError";
import HashOptionsProps from "#types/hashOptions/HashOptionsProps";
import Model from "#types/Model";
import RawProps from "#types/hashOptions/RawProps";
import formatDbQueryFilter from "#utils/formatters/formatDbQueryFilter";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";
import isHashOptionsProps from "#utils/typeGuards/isHashOptionsProps";

class HashOptions implements Model<FormattedProps, HashOptions> {
    static formatter = new Formatter();

    digest: string;
    id: number;
    iterations: number;
    keyLength: number;
    salt: string;
    userId: number;

    private constructor (props: HashOptionsProps) {
        this.digest = props.digest;
        this.id = props.id;
        this.iterations = props.iterations;
        this.keyLength = props.keyLength;
        this.salt = props.salt;
        this.userId = props.userId;
    }

    static async up (): Promise<void> {
        await generateSqlAndQuery(new CreateHashOptionsTable());
    }

    static async create (
        props: FormattedProps
    ): Promise<HashOptions> | never {
        const propsToDb = HashOptions.formatter.toDbCase(props);

        const record = await createRecord<RawProps, HashOptionsProps>(
            HASH_OPTIONS,
            propsToDb
        );

        return HashOptions.formatPropsAndInstantiate(record);
    }

    static async destroyById (
        id: number
    ): Promise<number | null> | never {
        return destroyRecordById<HashOptionsProps>(HASH_OPTIONS, id);
    }

    static async findAll (
        filter?: DbQueryFilter<FormattedProps>
    ): Promise<HashOptions[]> | never {
        const updatedFilter = formatDbQueryFilter(
            HashOptions.formatter,
            filter
        );

        const records = await findAllRecords<FormattedProps, HashOptionsProps>(
            HASH_OPTIONS,
            updatedFilter
        );

        return records.map(record => {
            return HashOptions.formatPropsAndInstantiate(record);
        });
    }

    static async findOne (
        filter: DbQueryFilter<FormattedProps>
    ): Promise<HashOptions | null> | never {
        if (!filter.where) {
            return null;
        }

        const updatedFilter = formatDbQueryFilter(
            HashOptions.formatter,
            filter
        );

        const record = await findOneRecord<FormattedProps, HashOptionsProps>(
            HASH_OPTIONS,
            updatedFilter
        );

        return (record)
            ? HashOptions.formatPropsAndInstantiate(record)
            : null;
    }

    static async findById (
        id: number
    ): Promise<HashOptions | null> | never {
        const record = await findRecordById<HashOptionsProps>(HASH_OPTIONS, id);

        return (record)
            ? HashOptions.formatPropsAndInstantiate(record)
            : null;
    }

    async save (): Promise<HashOptions> | never {
        return this.updateAttributes(this);
    }

    async updateAttributes (
        props: FormattedProps
    ): Promise<HashOptions> | never {
        const propsToDb = HashOptions.formatter.toDbCase(props);

        const record = await updateRecordAttributes<RawProps, HashOptionsProps>(
            HASH_OPTIONS,
            this.id,
            propsToDb
        );

        return HashOptions.formatPropsAndInstantiate(record);
    }

    static formatPropsAndInstantiate (
        props: RawProps
    ): HashOptions | never {
        const propsFromDb = HashOptions.formatter.fromDbCase(props);

        if (!isHashOptionsProps(propsFromDb)) {
            throw new HashOptionsError(INVALID_PROPS, UNPROCESSABLE_ENTITY);
        }

        return new HashOptions(propsFromDb);
    }
}

export default HashOptions;
