import {
    NO_REQUIRED_PROPS,
    NO_TABLE_CHOSEN
} from "constants/validationErrors";

import { OBJECT_EXPECTED } from "constants/typeErrors";
import { UpdateAttributes } from "utils/CrudSql";
import DbQuery from "utils/DbQuery";
import Indexer from "types/Indexer";
import Model from "types/Model";
import ValidationError from "utils/errors/ValidationError";
import isEmptyObject from "utils/isEmptyObject";
import isObject from "utils/isObject";

class BaseModel implements Model<BaseModel> {
    private _tableName = "";

    [key: string]: unknown;

    constructor (props: Indexer<unknown>) {
        Object.assign(this, props);
    }

    async save (): Promise<BaseModel> | never {
        return this.updateAttributes({ ...this });
    }

    async updateAttributes (
        props: unknown
    ): Promise<BaseModel> | never {
        if (!isObject(props)) {
            throw new TypeError(OBJECT_EXPECTED);
        }

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
