import {
    Create,
    DestroyById,
    Find,
    FindById,
    UpdateAttributes
} from "utils/CrudSql";

import DbQuery from "utils/DbQuery";
import Indexer from "types/Indexer";
import Model from "types/Model";
import ValidationError from "utils/errors/ValidationError";
import isEmptyObject from "utils/isEmptyObject";

class BaseModel implements Model<BaseModel> {
    static tableName = "";

    [key: string]: unknown;

    protected constructor (props: Indexer<unknown>) {
        Object.assign(this, props);
    }

    static setTableName (tableName: string): void {
        BaseModel.tableName = tableName;
    }

    static async create (
        props: Indexer<unknown>
    ): Promise<BaseModel | null> | never {
        if (isEmptyObject(props)) {
            throw new ValidationError();
        }

        const { tableName } = BaseModel;
        const sql = new Create(tableName)
            .generate(props);
        const queryPayload = await new DbQuery<Indexer<unknown>>()
            .query(sql);

        const record = queryPayload[0];
        const instance = new BaseModel(record);

        return instance;
    }

    static async findOne (
        filter?: Indexer<unknown>
    ): Promise<BaseModel> | never {
        const instances = await BaseModel.find(filter);
        return instances[0];
    }

    static async find (
        filter?: Indexer<unknown>
    ): Promise<BaseModel[]> | never {
        const { tableName } = BaseModel;
        const sql = new Find(tableName)
            .generate(filter);
        const queryPayload = await new DbQuery<Indexer<unknown>>()
            .query(sql);

        const instances = queryPayload.map(record => new BaseModel(record));
        return instances;
    }

    static async findById (
        id: string
    ): Promise<BaseModel | null> | never {
        const { tableName } = BaseModel;

        const sql = new FindById(tableName, id)
            .generate();
        const queryPayload = await new DbQuery<Indexer<unknown>>()
            .query(sql);

        if (queryPayload.length === 0) {
            return null;
        }

        const record = queryPayload[0];
        const instance = new BaseModel(record);

        return instance;
    }

    static async destroyById (
        id: string
    ): Promise<boolean> | never {
        const { tableName } = BaseModel;
        const sql = new DestroyById(tableName, id)
            .generate();
        const queryPayload = await new DbQuery<Indexer<unknown>>()
            .query(sql);

        const deletedRecord = queryPayload[0];
        const isSuccess = Boolean(deletedRecord.id);
        return isSuccess;
    }

    async save (): Promise<BaseModel> | never {
        return this.updateAttributes({ ...this });
    }

    async updateAttributes (
        props: Indexer<unknown>
    ): Promise<BaseModel> | never {
        if (isEmptyObject(props) || !this.id) {
            throw new ValidationError();
        }

        const { tableName } = BaseModel;
        const sql = new UpdateAttributes(tableName, this.id as string)
            .generate(props);
        const queryPayload = await new DbQuery<Indexer<unknown>>()
            .query(sql);

        const record = queryPayload[0];
        const instance = new BaseModel(record);

        return instance;
    }
}

export default BaseModel;
