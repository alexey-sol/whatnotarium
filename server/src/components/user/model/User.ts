import {
    createRecord,
    destroyRecordById,
    findOneRecord,
    findRecordById,
    findRecords,
    updateRecordAttributes
} from "utils/helpers/Model";

import { INVALID_PROPS } from "const/validationErrors";
import { USERS } from "const/dbTableNames";
import FormattedProps from "./types/FormattedProps";
import Indexer from "types/Indexer";
import Model from "types/Model";
import RawProps from "user/model/types/RawProps";
import Formatter from "utils/formatters/ModelFormatter/UserFormatter";
import UserProps from "user/model/types/UserProps";
import ValidationError from "errors/ValidationError";
import isUserProps from "utils/typeGuards/isUserProps";

class User implements Model<FormattedProps, User> {
    static formatter = new Formatter();

    createdAt: Date;
    email: string
    id: number
    name: string;
    password: Buffer;
    updatedAt: Date;

    private constructor (props: UserProps) {
        this.createdAt = props.createdAt;
        this.email = props.email;
        this.id = props.id;
        this.name = props.name;
        this.password = props.password;
        this.updatedAt = props.updatedAt;
    }

    static async create (
        props: FormattedProps
    ): Promise<User> | never {
        const propsToDb = User.formatter.toDbCase(props);

        const record = await createRecord<RawProps, UserProps>(
            USERS,
            propsToDb
        );

        return User.formatPropsAndInstantiate(record);
    }

    static async destroyById (
        id: number
    ): Promise<boolean> | never {
        return destroyRecordById<UserProps>(USERS, id);
    }

    static async find (
        filter?: Indexer<unknown>
    ): Promise<User[]> | never {
        const records = await findRecords<UserProps>(USERS, filter);
        return records.map(record => User.formatPropsAndInstantiate(record));
    }

    static async findOne (
        filter?: Indexer<unknown>
    ): Promise<User | null> | never {
        const record = await findOneRecord<UserProps>(USERS, filter);

        return (record)
            ? User.formatPropsAndInstantiate(record)
            : null;
    }

    static async findById (
        id: number
    ): Promise<User | null> | never {
        const record = await findRecordById<UserProps>(USERS, id);

        return (record)
            ? User.formatPropsAndInstantiate(record)
            : null;
    }

    async save (): Promise<User> | never {
        return this.updateAttributes(this);
    }

    async updateAttributes (
        props: FormattedProps
    ): Promise<User> | never {
        const propsToDb = User.formatter.toDbCase(props);

        const record = await updateRecordAttributes<RawProps, UserProps>(
            USERS,
            this.id,
            propsToDb
        );

        if (!record) {
            throw new ValidationError(INVALID_PROPS, 400);
        }

        return User.formatPropsAndInstantiate(record);
    }

    static formatPropsAndInstantiate (
        props: RawProps
    ): User | never {
        const formattedProps = User.formatter.fromDbCase(props);

        if (!isUserProps(formattedProps)) {
            throw new ValidationError(INVALID_PROPS, 400);
        }

        return new User(formattedProps);
    }
}

export default User;
