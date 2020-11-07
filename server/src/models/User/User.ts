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

import { INVALID_PROPS } from "#utils/const/validationErrors";
import { PROFILES, USERS } from "#utils/const/database/tableNames";
import { VIEW_FULL_USERS } from "#utils/const/database/viewNames";
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

class User implements Model<Attributes, User> {
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
        props: DataOnCreate
    ): Promise<User> | never {
        const record = await createRecord<Attributes, Item>(
            VIEW_FULL_USERS,
            props,
            ["id", "email", "createdAt", "updatedAt"]
        );

        return User.findById(record.id, [{
            as: "profile",
            attributes: ["name", "picture"],
            referencedKey: "userId",
            ownKey: "id",
            tableName: PROFILES
        }]) as Promise<User>;
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
        props: DataOnUpdate
    ): Promise<User> | never {
        const updatedProps = {
            ...props,
            updatedAt: new Date()
        };

        await updateRecordAttributes<Attributes, Item>(
            VIEW_FULL_USERS,
            this.id,
            updatedProps
        );

        return User.findById(this.id, [{ // TODO: fix it, the same include in many places
            as: "profile",
            attributes: ["name", "picture"],
            referencedKey: "userId",
            ownKey: "id",
            tableName: PROFILES
        }]) as Promise<User>;
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
