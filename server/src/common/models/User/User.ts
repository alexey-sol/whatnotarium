
import { USERS } from "constants/dbTableNames";
import { CreateUserPropsNormalizer } from "utils/DbPropsNormalizer";
import BaseModel from "models/BaseModel";
import BaseModelUtil from "models/BaseModelUtil";
import CreateInput from "models/User/types/CreateInput";
import DbQuery from "utils/DbQuery";
import Indexer from "types/Indexer";
import UpdateAttributesInput from "models/User/types/UpdateAttributesInput";
import User from "models/User/types/User";

const normalizer = new CreateUserPropsNormalizer();

class UserModel extends BaseModel {
    static async create (
        props: CreateInput
    ): Promise<User | null> | never {
        const userDbQuery = new DbQuery<User>(normalizer);

        return await BaseModelUtil.create(
            USERS,
            userDbQuery,
            props
        ) as User | null;
    }

    static async findOne (
        filter?: Indexer<unknown>
    ): Promise<User | null> | never {
        const userDbQuery = new DbQuery<User>(normalizer);

        return await BaseModelUtil.findOne(
            USERS,
            userDbQuery,
            filter
        ) as User | null;
    }

    static async find (
        filter?: Indexer<unknown>
    ): Promise<(User)[]> | never {
        const userDbQuery = new DbQuery<User>(normalizer);

        return await BaseModelUtil.find(
            USERS,
            userDbQuery,
            filter
        ) as (User)[];
    }

    static async findById (
        id: string
    ): Promise<User | null> | never {
        const userDbQuery = new DbQuery<User>(normalizer);

        return await BaseModelUtil.findById(
            USERS,
            userDbQuery,
            id
        ) as User | null;
    }

    static async destroyById (
        id: string
    ): Promise<boolean> | never {
        const userDbQuery = new DbQuery<User>();

        return BaseModelUtil.destroyById(
            USERS,
            userDbQuery,
            id
        );
    }

    async updateAttributes (
        props: UpdateAttributesInput
    ): Promise<User> | never {
        return await super.updateAttributes(props) as User;
    }
}

export default UserModel;
