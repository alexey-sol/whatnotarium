import {
    Create,
    DestroyById,
    Find,
    FindById
} from "utils/CrudSql";

import { NO_REQUIRED_PROPS } from "constants/validationErrors";
import { OBJECT_EXPECTED } from "constants/typeErrors";
import BaseModel from "./BaseModel";
import Indexer from "types/Indexer";
import ValidationError from "utils/errors/ValidationError";
import isEmptyObject from "utils/isEmptyObject";
import isObject from "utils/isObject";

class BaseModelUtil {
    static async create (
        tableName: string,
        dbQuery: any,
        props: unknown
    ): Promise<BaseModel | null> | never {
        if (!isObject(props)) {
            throw new TypeError(OBJECT_EXPECTED);
        }

        if (isEmptyObject(props)) {
            throw new ValidationError(NO_REQUIRED_PROPS, 400);
        }

        const sql = new Create(tableName)
            .generate(props);
        const queryPayload = await dbQuery
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
        dbQuery: any,
        filter?: Indexer<unknown>
    ): Promise<BaseModel | null> | never {
        const instances = await BaseModelUtil.find(tableName, dbQuery, filter);
        return instances[0];
    }

    static async find (
        tableName: string,
        dbQuery: any,
        filter?: Indexer<unknown>
    ): Promise<BaseModel[]> | never {
        const sql = new Find(tableName)
            .generate(filter);
        const queryPayload = await dbQuery
            .query(sql);

        const instances = queryPayload.map((record: BaseModel) => {
            return new BaseModel({
                ...record,
                _tableName: tableName
            });
        });

        return instances;
    }

    static async findById (
        tableName: string,
        dbQuery: any,
        id: string
    ): Promise<BaseModel | null> | never {
        const sql = new FindById(tableName, id)
            .generate();
        const queryPayload = await dbQuery
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
        dbQuery: any,
        id: string
    ): Promise<boolean> | never {
        const sql = new DestroyById(tableName, id)
            .generate();
        const queryPayload = await dbQuery
            .query(sql);

        const deletedRecord = queryPayload[0];
        const isSuccess = Boolean(deletedRecord.id);

        return isSuccess;
    }
}

export default BaseModelUtil;
