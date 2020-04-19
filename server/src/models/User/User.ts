import { UNPROCESSABLE_ENTITY } from "http-status";

import {
    createRecord,
    destroyRecordById,
    findOneRecord,
    findRecordById,
    findRecords,
    updateRecordAttributes
} from "#utils/sql/Model";

import { CreateUsersTable } from "#utils/sql/CreateTableSql";
import { INVALID_PROPS } from "#utils/const/validationErrors";
import { USERS } from "#utils/const/dbTableNames";
import FormattedProps from "#types/user/FormattedProps";
import Formatter from "#utils/formatters/ModelFormatter/UserFormatter";
import Model from "#types/Model";
import RawProps from "#types/user/RawProps";
import UserError from "#utils/errors/UserError";
import UserProps from "#types/user/UserProps";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";
import isUserProps from "#utils/typeGuards/isUserProps";

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

    static async up (): Promise<void> {
        await generateSqlAndQuery(new CreateUsersTable());
    }

    static async create (
        props: FormattedProps
    ): Promise<User> | never {
        const propsToDb = User.formatter.toDbCase(props);

        const record = await createRecord<RawProps, UserProps>(
            USERS,
            propsToDb
        );

        return User.instantiate(record);
    }

    static async destroyById (
        id: number
    ): Promise<number | null> | never {
        return destroyRecordById<UserProps>(USERS, id);
    }

    static async find (
        filter?: FormattedProps
    ): Promise<User[]> | never {
        const formattedFilter = (filter)
            ? User.formatter.toDbCase(filter)
            : filter;

        const records = await findRecords<FormattedProps, UserProps>(
            USERS,
            formattedFilter
        );

        return records.map(record => User.instantiate(record));
    }

    static async findOne (
        filter?: FormattedProps
    ): Promise<User | null> | never {
        const formattedFilter = (filter)
            ? User.formatter.toDbCase(filter)
            : filter;

        const record = await findOneRecord<FormattedProps, UserProps>(
            USERS,
            formattedFilter
        );

        return (record)
            ? User.instantiate(record)
            : null;
    }

    static async findById (
        id: number
    ): Promise<User | null> | never {
        const record = await findRecordById<UserProps>(USERS, id);

        return (record)
            ? User.instantiate(record)
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

        return User.instantiate(record);
    }

    static instantiate (
        props: RawProps
    ): User | never {
        const shouldFormatProps = this.formatter.isDbCase(props);

        const formattedProps = (shouldFormatProps)
            ? User.formatter.fromDbCase(props)
            : props;

        if (!isUserProps(formattedProps)) {
            throw new UserError(INVALID_PROPS, UNPROCESSABLE_ENTITY);
        }

        return new User(formattedProps);
    }
}

export default User;
