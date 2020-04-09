import {
    createRecord,
    destroyRecordById,
    findOneRecord,
    findRecordById,
    findRecords,
    updateRecordAttributes
} from "#utils/helpers/Model";

import { HASH_OPTIONS } from "#utils/const/dbTableNames";
import { INVALID_PROPS, NOT_FOUND } from "#utils/const/validationErrors";
import FormattedProps from "#types/hashOptions/FormattedProps";
import Formatter from "#utils/formatters/ModelFormatter/HashOptionsFormatter";
import HashOptionsProps from "#types/hashOptions/HashOptionsProps";
import Model from "#types/Model";
import RawProps from "#types/hashOptions/RawProps";
import HashOptionsError from "#utils/errors/HashOptionsError";
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
    ): Promise<boolean> | never {
        return destroyRecordById<HashOptionsProps>(HASH_OPTIONS, id);
    }

    static async find (
        filter?: FormattedProps
    ): Promise<HashOptions[]> | never {
        const formattedFilter = (filter)
            ? HashOptions.formatter.toDbCase(filter)
            : filter;

        const records = await findRecords<FormattedProps, HashOptionsProps>(
            HASH_OPTIONS,
            formattedFilter
        );

        return records.map(record => {
            return HashOptions.formatPropsAndInstantiate(record);
        });
    }

    static async findOne (
        filter?: FormattedProps
    ): Promise<HashOptions | null> | never {
        const formattedFilter = (filter)
            ? HashOptions.formatter.toDbCase(filter)
            : filter;

        const record = await findOneRecord<FormattedProps, HashOptionsProps>(
            HASH_OPTIONS,
            formattedFilter
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

        if (!record) {
            throw new HashOptionsError(NOT_FOUND, 404);
        }

        return HashOptions.formatPropsAndInstantiate(record);
    }

    static formatPropsAndInstantiate (
        props: RawProps
    ): HashOptions | never {
        const formattedProps = HashOptions.formatter.fromDbCase(props);

        if (!isHashOptionsProps(formattedProps)) {
            throw new HashOptionsError(INVALID_PROPS, 400);
        }

        return new HashOptions(formattedProps);
    }
}

export default HashOptions;
