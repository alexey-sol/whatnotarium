import {
    CreateQuery,
    DestroyByIdQuery,
    FindQuery,
    FindByIdQuery,
    UpdateAttributesQuery
} from "utils/PgQuery";

import { USERS } from "constants/dbTableNames";
import Model from "types/Model";
import ModelProps from "types/ModelProps";
import hashPassword from "utils/hashPassword";
import isEmptyObject from "utils/isEmptyObject";

class User implements Model<User> {
    private constructor (props: ModelProps) {
        Object.assign(this, props);
    }

    static async create (
        props: ModelProps
    ): Promise<User> | never {
        const { password } = props;
        const { hash } = hashPassword(password);

        const propsWithHashedPassword = {
            ...props,
            password: hash
        };

        const query = new CreateQuery<User>(USERS);

        try {
            const userProps = await query.query(propsWithHashedPassword);
            const user = new User(userProps);
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async find (): Promise<User[]> | never {
        const query = new FindQuery<User>(USERS);

        try {
            const users = await query.query();
            return users;
        } catch (error) {
            throw error;
        }
    }

    static async findById (
        id: string
    ): Promise<User | null> | never {
        const query = new FindByIdQuery<User>(USERS, id);

        try {
            const userProps = await query.query();
            const user = new User(userProps);

            return (isEmptyObject(user))
                ? null
                : user;
        } catch (error) {
            throw error;
        }
    }

    static async destroyById (
        id: string
    ): Promise<User> | never {
        const query = new DestroyByIdQuery<User>(USERS, id);

        try {
            const deletedUser = await query.query();
            return deletedUser;
        } catch (error) {
            throw error;
        }
    }

    async save (): Promise<User> | never {
        try {
            return await this.updateAttributes({...this});
        } catch (error) {
            throw error;
        }
    }

    async updateAttributes (
        props: ModelProps
    ): Promise<User> | never {
        const { id } = this as ModelProps;
        const query = new UpdateAttributesQuery<User>(USERS, id);

        try {
            const userProps = await query.query(props);
            const user = new User(userProps);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

export default User;
