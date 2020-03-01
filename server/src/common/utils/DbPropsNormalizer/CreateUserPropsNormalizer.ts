import CreateUserProps from "models/User/types/CreateUserProps";
import CreateUserRecordProps from "models/User/types/CreateUserRecordProps";
import DbPropsNormalizer from "types/DbPropsNormalizer";
import User from "models/User/types/User";
import UserRecord from "models/User/types/UserRecord";

class CreateUserPropsNormalizer implements DbPropsNormalizer {
    normalizeInput (props: CreateUserProps): CreateUserRecordProps {
        const {
            email,
            hashOptionsId,
            name,
            password
        } = props;

        return {
            email,
            hash_options_id: hashOptionsId,
            name,
            password
        };
    }

    normalizeOutput (props: UserRecord): User {
        const {
            email,
            hash_options_id,
            id,
            name,
            password
        } = props;

        return {
            email,
            hashOptionsId: hash_options_id,
            id,
            name,
            password
        };
    }
}

export default CreateUserPropsNormalizer;
