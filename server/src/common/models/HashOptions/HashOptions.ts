
import { USERS } from "constants/dbTableNames";
import { CreateUserPropsNormalizer } from "utils/DbPropsNormalizer";
import BaseModel from "models/BaseModel";
import BaseModelUtil from "models/BaseModelUtil";
import CreateInput from "models/HashOptions/types/CreateInput";
import DbQuery from "utils/DbQuery";
import HashOptions from "models/HashOptions/types/HashOptions";
import Indexer from "types/Indexer";
import UpdateAttributesInput from
    "models/HashOptions/types/UpdateAttributesInput";

const normalizer = new CreateUserPropsNormalizer();

class HashOptionsModel extends BaseModel {
    static async create (
        props: CreateInput
    ): Promise<HashOptions | null> | never {
        const userDbQuery = new DbQuery<HashOptions>(normalizer);

        return await BaseModelUtil.create(
            USERS,
            userDbQuery,
            props
        ) as HashOptions | null;
    }

    static async findOne (
        filter?: Indexer<unknown>
    ): Promise<HashOptions | null> | never {
        const userDbQuery = new DbQuery<HashOptions>(normalizer);

        return await BaseModelUtil.findOne(
            USERS,
            userDbQuery,
            filter
        ) as HashOptions | null;
    }

    static async find (
        filter?: Indexer<unknown>
    ): Promise<(HashOptionsModel & HashOptions)[]> | never {
        const userDbQuery = new DbQuery<HashOptions>(normalizer);

        return await BaseModelUtil.find(
            USERS,
            userDbQuery,
            filter
        ) as (HashOptionsModel & HashOptions)[];
    }

    static async findById (
        id: string
    ): Promise<HashOptions | null> | never {
        const userDbQuery = new DbQuery<HashOptions>(normalizer);

        return await BaseModelUtil.findById(
            USERS,
            userDbQuery,
            id
        ) as HashOptions | null;
    }

    static async destroyById (
        id: string
    ): Promise<boolean> | never {
        const userDbQuery = new DbQuery<HashOptions>();

        return BaseModelUtil.destroyById(
            USERS,
            userDbQuery,
            id
        );
    }

    async updateAttributes (
        props: UpdateAttributesInput
    ): Promise<HashOptionsModel & HashOptions> | never {
        return await super.updateAttributes(props) as
            HashOptionsModel & HashOptions;
    }
}

export default HashOptionsModel;
