import {
    CreateQuery,
    DestroyByIdQuery,
    FindQuery,
    FindByIdQuery,
    UpdateAttributesQuery
} from "utils/DbQuery";

import { USERS } from "constants/dbTableNames";
import Model from "types/Model";
import ModelProps from "types/ModelProps";
import hashPassword from "utils/hashPassword";

class User implements Model<User> {
    private constructor (props: ModelProps) {
        Object.assign(this, props);
    }

    static async create (
        props: ModelProps
    ): Promise<User> | never {
        const { password } = props;
        const { hash } = hashPassword(password);

        const updatedProps = {
            ...props,
            password: hash
        };

        const query = new CreateQuery<User>(USERS);

        try {
            const userProps = await query.query("create", updatedProps);
            const user = new User(userProps);

            return user;
        } catch (error) {
            throw error;
        }
    }

    static async find (): Promise<User[]> | never {
        const query = new FindQuery<User>(USERS);

        try {
            const users = await query.query("find");
            return users;
        } catch (error) {
            throw error;
        }
    }

    static async findById (
        id: string
    ): Promise<User> | never {
        const query = new FindByIdQuery<User>(USERS, id);

        try {
            const userProps = await query.query("find-by-id");
            const user = new User(userProps);

            return user;
        } catch (error) {
            throw error;
        }
    }

    static async destroyById (
        id: string
    ): Promise<User> | never {
        const query = new DestroyByIdQuery<User>(USERS, id);

        try {
            const deletedUser = await query.query("destroy-by-id");
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
            const userProps = await query.query("update-attributes", props);
            const user = new User(userProps);

            return user;
        } catch (error) {
            throw error;
        }
    }
}

export default User;
