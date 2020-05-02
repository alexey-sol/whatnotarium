import { UNPROCESSABLE_ENTITY } from "http-status";

import {
    createRecord,
    destroyRecordById,
    findAllRecords,
    findOneRecord,
    findRecordById,
    updateRecordAttributes
} from "#utils/sql/Model";

import { CreateUsersTable } from "#utils/sql/CreateTableSql";
import { INVALID_PROPS } from "#utils/const/validationErrors";
import { USERS } from "#utils/const/dbTableNames";
import DbQueryFilter from "#types/DbQueryFilter";
import FormattedProps from "#types/user/FormattedProps";
import Formatter from "#utils/formatters/ModelFormatter/UserFormatter";
import Model from "#types/Model";
import RawProps from "#types/user/RawProps";
import UserError from "#utils/errors/UserError";
import UserProps from "#types/user/UserProps";
import formatDbQueryFilter from "#utils/formatters/formatDbQueryFilter";
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
        const {
            createdAt = new Date(),
            updatedAt = new Date()
        } = props;

        const propsToDb = User.formatter.toDbCase({
            ...props,
            createdAt,
            updatedAt
        });

        const record = await createRecord<RawProps, UserProps>(
            USERS,
            propsToDb
        );

        return User.formatPropsAndInstantiate(record);
    }

    static async destroyById (
        id: number
    ): Promise<number | null> | never {
        return destroyRecordById<UserProps>(USERS, id);
    }

    static async findAll (
        filter?: DbQueryFilter<FormattedProps>
    ): Promise<User[]> | never {
        const updatedFilter = formatDbQueryFilter(User.formatter, filter);

        const records = await findAllRecords<RawProps, UserProps>(
            USERS,
            updatedFilter
        );

        return records.map(record => User.formatPropsAndInstantiate(record));
    }

    static async findOne (
        filter: DbQueryFilter<FormattedProps>
    ): Promise<User | null> | never {
        if (!filter.where) {
            return null;
        }

        const updatedFilter = formatDbQueryFilter(User.formatter, filter);

        const record = await findOneRecord<RawProps, UserProps>(
            USERS,
            updatedFilter
        );

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
        return this.updateAttributes({
            ...this,
            updatedAt: new Date()
        });
    }

    async updateAttributes (
        props: FormattedProps
    ): Promise<User> | never {
        const {
            updatedAt = new Date()
        } = props;

        const propsToDb = User.formatter.toDbCase({
            ...props,
            updatedAt
        });

        const record = await updateRecordAttributes<RawProps, UserProps>(
            USERS,
            this.id,
            propsToDb
        );

        return User.formatPropsAndInstantiate(record);
    }

    static formatPropsAndInstantiate (
        props: RawProps
    ): User | never {
        const propsFromDb = User.formatter.fromDbCase(props);

        if (!isUserProps(propsFromDb)) {
            throw new UserError(INVALID_PROPS, UNPROCESSABLE_ENTITY);
        }

        return new User(propsFromDb);
    }
}

export default User;
