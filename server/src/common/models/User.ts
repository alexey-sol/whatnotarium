import {
    Create,
    DestroyById,
    Find,
    FindById,
    UpdateAttributes
} from "utils/Sql";

import { USERS } from "constants/dbTableNames";
import DbQuery from "utils/DbQuery";
import Indexer from "types/Indexer";
import Model from "types/Model";
import PropsError from "utils/errors/PropsError";
import isEmptyObject from "utils/isEmptyObject";

class User implements Model<User> {
    [key: string]: unknown;

    private constructor (props: Indexer<unknown>) {
        Object.assign(this, props);
    }

    static async create (
        props: Indexer<unknown>
    ): Promise<User | null> | never {
        if (isEmptyObject(props)) {
            throw new PropsError();
        }

        const sql = new Create(USERS)
            .generate(props);
        const queryPayload = await new DbQuery<Indexer<unknown>>()
            .query(sql);

        const userProps = queryPayload[0];
        const user = new User(userProps);
        return user;
    }

    static async find (
        filter?: Indexer<unknown>
    ): Promise<User[]> | never {
        const sql = new Find(USERS)
            .generate(filter);
        const queryPayload = await new DbQuery<Indexer<unknown>>()
            .query(sql);

        const users = queryPayload.map(userProps => new User(userProps));
        return users;
    }

    static async findById (
        id: string
    ): Promise<User | null> | never {
        const sql = new FindById(USERS, id)
            .generate();
        const queryPayload = await new DbQuery<Indexer<unknown>>()
            .query(sql);

        if (queryPayload.length === 0) {
            return null;
        }

        const userProps = queryPayload[0];
        const user = new User(userProps);
        return user;
    }

    static async destroyById (
        id: string
    ): Promise<boolean> | never {
        const sql = new DestroyById(USERS, id)
            .generate();
        const queryPayload = await new DbQuery<Indexer<unknown>>()
            .query(sql);

        const deletedUserProps = queryPayload[0];
        const isSuccess = Boolean(deletedUserProps.id);
        return isSuccess;
    }

    async save (): Promise<User> | never {
        return this.updateAttributes({ ...this });
    }

    async updateAttributes (
        props: Indexer<unknown>
    ): Promise<User> | never {
        if (isEmptyObject(props) || !this.id) {
            throw new PropsError();
        }

        const sql = new UpdateAttributes(USERS, this.id as string)
            .generate(props);
        const queryPayload = await new DbQuery<Indexer<unknown>>()
            .query(sql);

        const userProps = queryPayload[0];
        const user = new User(userProps);
        return user;
    }
}

export default User;
