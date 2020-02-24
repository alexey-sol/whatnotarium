import {
    NO_REQUIRED_PROPS,
    NO_TABLE_CHOSEN
} from "constants/validationErrors";

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
    private _tableName = "";

    [key: string]: unknown;

    protected constructor (props: Indexer<unknown>) {
        Object.assign(this, props);
    }

    static async create (
        tableName: string,
        props: Indexer<unknown>
    ): Promise<BaseModel | null> | never {
        if (isEmptyObject(props)) {
            throw new ValidationError(NO_REQUIRED_PROPS, 400);
        }

        const sql = new Create(tableName)
            .generate(props);
        const queryPayload = await new DbQuery<Indexer<unknown>>()
            .query(sql);

        const record = queryPayload[0];
        const instance = new BaseModel({
            ...record,
            _tableName: tableName
        });

        return instance;
    }

    static async findOne (
        tableName: string,
        filter?: Indexer<unknown>
    ): Promise<BaseModel> | never {
        const instances = await BaseModel.find(tableName, filter);
        return instances[0];
    }

    static async find (
        tableName: string,
        filter?: Indexer<unknown>
    ): Promise<BaseModel[]> | never {
        const sql = new Find(tableName)
            .generate(filter);
        const queryPayload = await new DbQuery<Indexer<unknown>>()
            .query(sql);

        const instances = queryPayload.map(record => new BaseModel({
            ...record,
            _tableName: tableName
        }));
        return instances;
    }

    static async findById (
        tableName: string,
        id: string
    ): Promise<BaseModel | null> | never {
        const sql = new FindById(tableName, id)
            .generate();
        const queryPayload = await new DbQuery<Indexer<unknown>>()
            .query(sql);

        if (queryPayload.length === 0) {
            return null;
        }

        const record = queryPayload[0];
        const instance = new BaseModel({
            ...record,
            _tableName: tableName
        });

        return instance;
    }

    static async destroyById (
        tableName: string,
        id: string
    ): Promise<boolean> | never {
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
            throw new ValidationError(NO_REQUIRED_PROPS, 400);
        }

        if (!this._tableName) {
            throw new ValidationError(NO_TABLE_CHOSEN, 500);
        }

        const sql = new UpdateAttributes(this._tableName, this.id as string)
            .generate(props);
        const queryPayload = await new DbQuery<Indexer<unknown>>()
            .query(sql);

        const record = queryPayload[0];
        const instance = new BaseModel(record);

        return instance;
    }
}

export default BaseModel;
