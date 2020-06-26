import { UNPROCESSABLE_ENTITY } from "http-status";

import {
    createRecord,
    destroyRecordById,
    findAllRecords,
    findOneRecord,
    findRecordById,
    updateRecordAttributes
} from "#utils/sql/Model";

import { CreateProfilesTable } from "#utils/sql/SchemaSqlGenerator";
import { PROFILES } from "#utils/const/database/tableNames";
import { INVALID_PROPS } from "#utils/const/validationErrors";
import Attributes from "#types/profile/Attributes";
import DbQueryFilter from "#types/DbQueryFilter";
import Item from "#types/profile/Item";
import Model from "#types/Model";
import ProfileError from "#utils/errors/ProfileError";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";
import isProfileItem from "#utils/typeGuards/isProfileItem";

class Profile implements Model<Attributes, Profile> {
    static tableName = PROFILES;

    createdAt: Date;
    id: number;
    name: string;
    picture?: Buffer;
    updatedAt: Date;
    userId: number;

    private constructor (props: Item) {
        this.createdAt = props.createdAt;
        this.id = props.id;
        this.name = props.name;
        this.picture = props.picture;
        this.updatedAt = props.updatedAt;
        this.userId = props.userId;
    }

    static async up (): Promise<void> {
        await generateSqlAndQuery(new CreateProfilesTable());
    }

    static async create (
        props: Attributes
    ): Promise<Profile> | never {
        const record = await createRecord<Attributes, Item>(
            PROFILES,
            props
        );

        return Profile.formatPropsAndInstantiate(record);
    }

    static async destroyById (
        id: number
    ): Promise<number | null> | never {
        return destroyRecordById<Item>(PROFILES, id);
    }

    static async findAll (
        filter?: DbQueryFilter<Attributes>
    ): Promise<Profile[]> | never {
        const records = await findAllRecords<Attributes, Item>(
            PROFILES,
            filter
        );

        return records.map(record => {
            return Profile.formatPropsAndInstantiate(record);
        });
    }

    static async findOne (
        filter: DbQueryFilter<Attributes>
    ): Promise<Profile | null> | never {
        if (!filter.where) {
            return null;
        }

        const record = await findOneRecord<Attributes, Item>(
            PROFILES,
            filter
        );

        return (record)
            ? Profile.formatPropsAndInstantiate(record)
            : null;
    }

    static async findById (
        id: number
    ): Promise<Profile | null> | never {
        const record = await findRecordById<Item>(PROFILES, id);

        return (record)
            ? Profile.formatPropsAndInstantiate(record)
            : null;
    }

    async save (): Promise<Profile> | never {
        return this.updateAttributes(this);
    }

    async updateAttributes (
        props: Attributes
    ): Promise<Profile> | never {
        const record = await updateRecordAttributes<Attributes, Item>(
            PROFILES,
            this.id,
            props
        );

        return Profile.formatPropsAndInstantiate(record);
    }

    static formatPropsAndInstantiate (
        props: Attributes
    ): Profile | never {
        if (!isProfileItem(props)) {
            throw new ProfileError(INVALID_PROPS, UNPROCESSABLE_ENTITY);
        }

        return new Profile(props);
    }
}

export default Profile;
