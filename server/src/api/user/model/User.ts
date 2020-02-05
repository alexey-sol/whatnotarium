import Model from "types/Model";
import ObjectIndexer from "types/ObjectIndexer";
import createUserQuery from "./createUser.query";
import deleteUserQuery from "./deleteUser.query";
import getUserQuery from "./getUser.query";
import getUsersQuery from "./getUsers.query";
import hashPassword from "utils/hashPassword";
import makeDbQuery from "utils/makeDbQuery";
import updateUserQuery from "./updateUser.query";

interface UserData {
    email?: string;
    id?: string;
    name?: string;
    password?: string;
}

class User implements Model<User> {
    email: string;
    id: string;
    name: string;
    password: string;

    private constructor (data: ObjectIndexer<any>) {
        this.email = data.email;
        this.id = data.id;
        this.name = data.name;
        this.password = data.password;
    }

    static async create (
        data: ObjectIndexer<any>
    ): Promise<User> | never {
        try {
            const {
                email,
                name,
                password
            } = data;

            const hashPasswordResult = hashPassword(password);
            const { hash } = hashPasswordResult;

            const queryValues = [email, hash, name];
    
            const result = await makeDbQuery(
                "create-user",
                createUserQuery,
                queryValues
            );
    
            const userData: UserData = result.rows[0];
            const user = new User(userData);

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
    
            const userData: UserData = result.rows[0];
            const user = new User(userData);

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
        const { email, id, name, password } = this;

        const userData: UserData = {
            email,
            id,
            name,
            password
        };

        try {
            return await this.updateAttributes(userData);
        } catch (error) {
            throw error;
        }
    }

    async updateAttributes (
        data: ObjectIndexer<any>
    ): Promise<User> | never {
        const {
            email,
            name,
            password
        } = data;
    
        try {
            const { id } = this;
            const queryValues = [email, password, name, id];

            const result = await makeDbQuery(
                "update-user",
                updateUserQuery,
                queryValues
            );

            const partialUserData: UserData = result.rows[0];

            const user = new User({
                ...this,
                ...partialUserData
            });

            return user;
        } catch (error) {
            throw error;
        }
    }
}

export default User;
