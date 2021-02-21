import { UNPROCESSABLE_ENTITY } from "http-status";
import moment from "moment";

import {
    countRecords,
    createRecord,
    destroyAllRecords,
    findAllRecords,
    findOneRecord,
    updateRecordAttributes
} from "#utils/sql/Model";

import { CreateUserTokenTable, CreateUserTokenTypesTable } from "#utils/sql/SchemaSqlGenerator";
import { INVALID_PROPS } from "#utils/const/validationErrors";
import { USER_TOKENS } from "#utils/const/database/tableNames";
import Attributes from "#types/userToken/Attributes";
import DataOnCreate from "#types/userToken/DataOnCreate";
import DataOnUpdate from "#types/userToken/DataOnUpdate";
import DbQueryFilter from "#types/DbQueryFilter";
import Include from "#types/Include";
import Item from "#types/userToken/Item";
import Model from "#types/Model";
import UserTokenError from "#utils/errors/UserTokenError";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";
import isUserTokenItem from "#utils/typeGuards/isUserTokenItem";
import separateIncludedAttributes from "#utils/helpers/separateIncludedAttributes";

class UserToken implements Model<DataOnUpdate, UserToken> {
    static tableName = USER_TOKENS;

    createdAt: Date;
    expirationDate: Date;
    id: number;
    token: string;
    typeId: number;
    userId: number;

    private constructor (props: Item) {
        this.createdAt = props.createdAt;
        this.expirationDate = props.expirationDate;
        this.id = props.id;
        this.token = props.token;
        this.typeId = props.typeId;
        this.userId = props.userId;
    }

    static async up (): Promise<void> {
        await generateSqlAndQuery(new CreateUserTokenTypesTable());
        await generateSqlAndQuery(new CreateUserTokenTable());
    }

    static async create (
        props: DataOnCreate,
        include?: Include[]
    ): Promise<UserToken> | never {
        const record = await createRecord<DataOnCreate, Item>(
            USER_TOKENS,
            props,
            ["id", "createdAt", "expirationDate", "token", "typeId", "userId"]
        );

        return (include)
            ? UserToken.findById(record.id, include) as Promise<UserToken>
            : UserToken.formatPropsAndInstantiate(record);
    }

    static async destroyAll (
        filter: DbQueryFilter<Attributes>
    ): Promise<number | null> | never {
        if (!filter.where) {
            return null;
        }

        return destroyAllRecords<Attributes, Item>(USER_TOKENS, filter);
    }

    static async destroyById (
        id: number
    ): Promise<number | null> | never {
        const where = { id };
        return UserToken.destroyAll({ where });
    }

    static async count (
        filter?: DbQueryFilter<Attributes>
    ): Promise<number> | never {
        return countRecords<Attributes>(USER_TOKENS, filter);
    }

    static async findAll (
        filter?: DbQueryFilter<Attributes>
    ): Promise<UserToken[]> | never {
        const records = await findAllRecords<Attributes, Item>(USER_TOKENS, filter);

        return records.map(record => UserToken.formatPropsAndInstantiate(
            record,
            filter?.include
        ));
    }

    static async findOne (
        filter: DbQueryFilter<Attributes>
    ): Promise<UserToken | null> | never {
        if (!filter.where) {
            return null;
        }

        const record = await findOneRecord<Attributes, Item>(USER_TOKENS, filter);

        return (record)
            ? UserToken.formatPropsAndInstantiate(record, filter?.include)
            : null;
    }

    static async findById (
        id: number,
        include?: Include[]
    ): Promise<UserToken | null> | never {
        const where = { id };
        return UserToken.findOne({ include, where });
    }

    async save (): Promise<UserToken> | never {
        return this.updateAttributes(this);
    }

    async updateAttributes (
        props: DataOnUpdate,
        include?: Include[]
    ): Promise<UserToken> | never {
        const updatedProps = {
            ...props,
            updatedAt: new Date()
        };

        const record = await updateRecordAttributes<DataOnUpdate, Item>(
            USER_TOKENS,
            this.id,
            updatedProps,
            ["id", "createdAt", "expirationDate", "token", "typeId", "userId"]
        );

        return (include)
            ? UserToken.findById(this.id, include) as Promise<UserToken>
            : UserToken.formatPropsAndInstantiate(record || this);
    }

    static formatPropsAndInstantiate (
        props: Attributes,
        include?: Include[]
    ): UserToken | never {
        const item = (include)
            ? separateIncludedAttributes(props, include)
            : props;

        if (!isUserTokenItem(item)) {
            throw new UserTokenError(INVALID_PROPS, UNPROCESSABLE_ENTITY);
        }

        return new UserToken(item);
    }

    static async isValidToken (token: string): Promise<boolean> {
        const confirmToken = await UserToken.findOne({ where: { token } });

        if (!confirmToken) {
            return false;
        }

        const { expirationDate } = confirmToken;
        return moment(Date.now()).isBefore(expirationDate);
    }
}

export default UserToken;
