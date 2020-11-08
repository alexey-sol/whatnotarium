import { UNPROCESSABLE_ENTITY } from "http-status";

import {
    countRecords,
    createRecord,
    destroyRecordById,
    findAllRecords,
    findOneRecord,
    findRecordById,
    updateRecordAttributes
} from "#utils/sql/Model";

import {
    CreateFullUsersView,
    CreateHashOptionsTable,
    CreateProfilesTable,
    CreateUsersTable
} from "#utils/sql/SchemaSqlGenerator";

import { FULL_USERS_VIEW } from "#utils/const/database/viewNames";
import { INVALID_PROPS } from "#utils/const/validationErrors";
import { USERS } from "#utils/const/database/tableNames";
import Attributes from "#types/user/Attributes";
import DataOnCreate from "#types/user/DataOnCreate";
import DataOnUpdate from "#types/user/DataOnUpdate";
import DbQueryFilter from "#types/DbQueryFilter";
import Include from "#types/Include";
import Item from "#types/user/Item";
import Model from "#types/Model";
import UserError from "#utils/errors/UserError";
import UserHashOptions from "#types/UserHashOptions";
import UserProfile from "#types/UserProfile";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";
import isUserItem from "#utils/typeGuards/isUserItem";
import separateIncludedAttributes from "#utils/helpers/separateIncludedAttributes";

class User implements Model<DataOnUpdate, User> {
    static tableName = USERS;

    createdAt: Date;
    email: string;
    hashOptions?: UserHashOptions;
    id: number;
    profile?: UserProfile;
    updatedAt: Date;

    private constructor (props: Item) {
        this.createdAt = props.createdAt;
        this.email = props.email;
        this.id = props.id;
        this.updatedAt = props.updatedAt;

        if (props.hashOptions) {
            this.hashOptions = props.hashOptions;
        }

        if (props.profile) {
            this.profile = props.profile;
        }
    }

    static async up (): Promise<void> {
        await generateSqlAndQuery(new CreateUsersTable());
        await generateSqlAndQuery(new CreateProfilesTable());
        await generateSqlAndQuery(new CreateHashOptionsTable());
        await generateSqlAndQuery(new CreateFullUsersView());
    }

    static async create (
        props: DataOnCreate,
        include?: Include[]
    ): Promise<User> | never {
        const record = await createRecord<DataOnCreate, Item>(
            FULL_USERS_VIEW,
            props,
            ["id", "email", "createdAt", "updatedAt"]
        );

        return (include)
            ? User.findById(record.id, include) as Promise<User>
            : User.formatPropsAndInstantiate(record);
    }

    static async destroyById (
        id: number
    ): Promise<number | null> | never {
        return destroyRecordById<Item>(USERS, id);
    }

    static async count (
        filter?: DbQueryFilter<Attributes>
    ): Promise<number> | never {
        return countRecords<Attributes>(USERS, filter);
    }

    static async findAll (
        filter?: DbQueryFilter<Attributes>
    ): Promise<User[]> | never {
        const records = await findAllRecords<Attributes, Item>(
            USERS,
            filter
        );

        return records.map(record => User.formatPropsAndInstantiate(
            record,
            filter?.include
        ));
    }

    static async findOne (
        filter: DbQueryFilter<Attributes>
    ): Promise<User | null> | never {
        if (!filter.where) {
            return null;
        }

        const record = await findOneRecord<Attributes, Item>(
            USERS,
            filter
        );

        return (record)
            ? User.formatPropsAndInstantiate(record, filter?.include)
            : null;
    }

    static async findById (
        id: number,
        include?: Include[]
    ): Promise<User | null> | never {
        const record = await findRecordById<Item>(USERS, id, include);

        return (record)
            ? User.formatPropsAndInstantiate(record, include)
            : null;
    }

    async save (): Promise<User> | never {
        return this.updateAttributes(this);
    }

    async updateAttributes (
        props: DataOnUpdate,
        include?: Include[]
    ): Promise<User> | never {
        const updatedProps = {
            ...props,
            updatedAt: new Date()
        };

        const record = await updateRecordAttributes<DataOnUpdate, Item>(
            FULL_USERS_VIEW,
            this.id,
            updatedProps,
            ["id", "email", "createdAt", "updatedAt"]
        );

        return (include)
            ? User.findById(this.id, include) as Promise<User>
            : User.formatPropsAndInstantiate(record || this);
    }

    static formatPropsAndInstantiate (
        props: Attributes,
        include?: Include[]
    ): User | never {
        const item = (include)
            ? separateIncludedAttributes(props, include)
            : props;

        if (!isUserItem(item)) {
            throw new UserError(INVALID_PROPS, UNPROCESSABLE_ENTITY);
        }

        return new User(item);
    }
}

export default User;
