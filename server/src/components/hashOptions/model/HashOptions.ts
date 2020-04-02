import {
    createRecord,
    destroyRecordById,
    findOneRecord,
    findRecordById,
    findRecords,
    updateRecordAttributes
} from "@common/utils/model";

import { HASH_OPTIONS } from "@const/dbTableNames";
import { INVALID_PROPS } from "@const/validationErrors";
import FormattedProps from "./types/FormattedProps";
import HashOptionsFormatter from "@common/utils/ModelFormatter/HashOptionsFormatter"; // eslint-disable-line
import HashOptionsProps from "@hashOptions/model/types/HashOptionsProps";
import Indexer from "@common/types/Indexer";
import Model from "@common/types/Model";
import RawProps from "@hashOptions/model/types/RawProps";
import ValidationError from "@common/errors/ValidationError";
import isHashOptionsProps from "@common/utils/typeGuards/isHashOptionsProps";

class HashOptions implements Model<FormattedProps, HashOptions> {
    static formatter = new HashOptionsFormatter();

    digest: string;
    id: number
    iterations: number;
    keyLength: number;
    salt: string;

    private constructor (props: HashOptionsProps) {
        this.digest = props.digest;
        this.id = props.id;
        this.iterations = props.iterations;
        this.keyLength = props.keyLength;
        this.salt = props.salt;
    }

    static async create (
        props: FormattedProps
    ): Promise<HashOptions | null> | never {
        const propsToDb = HashOptions.formatter.toDbCase(props);

        const record = await createRecord<RawProps, HashOptionsProps>(
            HASH_OPTIONS,
            propsToDb
        );

        return (record)
            ? HashOptions.formatPropsAndInstantiate(record)
            : null;
    }

    static async destroyById (
        id: number
    ): Promise<boolean> | never {
        return destroyRecordById<HashOptionsProps>(HASH_OPTIONS, id);
    }

    static async find (
        filter?: Indexer<unknown>
    ): Promise<HashOptions[]> | never {
        const records = await findRecords<HashOptionsProps>(
            HASH_OPTIONS,
            filter
        );

        return records.map(record => {
            return HashOptions.formatPropsAndInstantiate(record);
        });
    }

    static async findOne (
        filter?: Indexer<unknown>
    ): Promise<HashOptions | null> | never {
        const record = await findOneRecord<HashOptionsProps>(
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
            throw new ValidationError(INVALID_PROPS, 400);
        }

        return HashOptions.formatPropsAndInstantiate(record);
    }

    static formatPropsAndInstantiate (
        props: RawProps
    ): HashOptions | never {
        const formattedProps = HashOptions.formatter.fromDbCase(props);

        if (!isHashOptionsProps(formattedProps)) {
            throw new ValidationError(INVALID_PROPS, 400);
        }

        return new HashOptions(formattedProps);
    }
}

export default HashOptions;
