import {
    Create,
    DestroyById,
    Find,
    FindById,
    UpdateAttributes
} from "utils/Sql";

import { USERS } from "constants/dbTableNames";
import DbQuery from "utils/DbQuery";
import Model from "types/Model";
import ModelProps from "types/ModelProps";
import PropsError from "utils/errors/PropsError";
import hashPassword from "utils/hashPassword";
import isEmptyObject from "utils/isEmptyObject";

class User implements Model<User> {
    private constructor (props: ModelProps) {
        Object.assign(this, props);
    }

    static async create (
        props: ModelProps
    ): Promise<User | null> | never {
        if (isEmptyObject(props)) {
            throw new PropsError();
        }

        const { password } = props;
        const { hash } = hashPassword(password);

        const propsWithHashedPassword = {
            ...props,
            password: hash
        };

        const sql = new Create(USERS)
            .generate(propsWithHashedPassword);
        const userProps = await new DbQuery<ModelProps>()
            .query(sql);

        const user = new User(userProps);
        return user;
    }

    static async find (): Promise<User[]> | never {
        const sql = new Find(USERS)
            .generate();
        const usersProps = await new DbQuery<ModelProps>()
            .query(sql);

        if (usersProps.length === 0) {
            return [];
        }

        const users = usersProps.map(props => new User(props));
        return users;
    }

    static async findById (
        id: string
    ): Promise<User | null> | never {
        const sql = new FindById(USERS, id)
            .generate();
        const userProps = await new DbQuery<ModelProps>()
            .query(sql);

        if (userProps.length === 0) {
            return null;
        }

        const user = new User(userProps);
        return user;
    }

    static async destroyById (
        id: string
    ): Promise<boolean> | never {
        const sql = new DestroyById(USERS, id)
            .generate();
        const deletedUserProps = await new DbQuery<ModelProps>()
            .query(sql);

        const isSuccess = Boolean(deletedUserProps.id);
        return isSuccess;
    }

    async save (): Promise<User> | never {
        return this.updateAttributes({ ...this });
    }

    async updateAttributes (
        props: ModelProps
    ): Promise<User> | never {
        if (isEmptyObject(props)) {
            throw new PropsError();
        }

        const { id } = this as ModelProps;
        const sql = new UpdateAttributes(USERS, id)
            .generate(props);
        const userProps = await new DbQuery<ModelProps>()
            .query(sql);

        const user = new User(userProps);
        return user;
    }
}

export default User;
