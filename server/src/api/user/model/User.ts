import Model from "types/Model";
import ModelProps from "types/ModelProps";
import UpdateAttributesQuery from "utils/UpdateAttributesQuery";
import createUserQuery from "./createUser.query";
import deleteUserQuery from "./deleteUser.query";
import getUserQuery from "./getUser.query";
import getUsersQuery from "./getUsers.query";
import hashPassword from "utils/hashPassword";
import makeDbQuery from "utils/makeDbQuery";

class User implements Model<User> {
    private constructor (props: ModelProps) {
        Object.assign(this, props);
    }

    static async create (
        props: ModelProps
    ): Promise<User> | never {
        const {
            email,
            name,
            password
        } = props;

        const hashPasswordResult = hashPassword(password);
        const { hash } = hashPasswordResult;
        const queryValues = [email, hash, name];

        try {
            const result = await makeDbQuery(
                "create-user",
                createUserQuery,
                queryValues
            );
    
            const userProps: ModelProps = result.rows[0];
            const user = new User(userProps);

            return user;
        } catch (error) {
            throw error;
        }
    }

    static async find (): Promise<User[]> | never {
        try {
            const result = await makeDbQuery(
                "get-users",
                getUsersQuery
            );
    
            const users = result.rows;
            return users;
        } catch (error) {
            throw error;
        }
    }

    static async findById (
        id: string
    ): Promise<User> | never {
        try {
            const result = await makeDbQuery(
                "get-user",
                getUserQuery,
                [id]
            );
    
            const userProps: ModelProps = result.rows[0];
            const user = new User(userProps);

            return user;
        } catch (error) {
            throw error;
        }
    }

    static async destroyById (
        id: string
    ): Promise<string | never> {
        try {
            await makeDbQuery(
                "delete-user",
                deleteUserQuery,
                [id]
            );

            return id;
        } catch (error) {
            throw error;
        }
    }

    async save (): Promise<User> | never {
        const { email, id, name, password } = this as ModelProps;

        const userProps: ModelProps = {
            email,
            id,
            name,
            password
        };

        try {
            return await this.updateAttributes(userProps);
        } catch (error) {
            throw error;
        }
    }

    async updateAttributes (
        props: ModelProps
    ): Promise<User> | never {
        const { id } = this as ModelProps;
        const query = new UpdateAttributesQuery();

        try {
            const queryResult = await query.query(id, props);
            const userProps = queryResult.rows[0];
            const user = new User(userProps);

            return user;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}

export default User;
