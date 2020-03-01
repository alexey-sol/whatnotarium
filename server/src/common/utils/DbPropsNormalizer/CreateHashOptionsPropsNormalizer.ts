import CreateHashOptionsProps from
    "models/HashOptions/types/CreateHashOptionsProps";

import CreateHashOptionsRecordProps from
    "models/HashOptions/types/CreateHashOptionsRecordProps";

import DbPropsNormalizer from "types/DbPropsNormalizer";
import HashOptions from "models/HashOptions/types/HashOptions";
import HashOptionsRecord from "models/HashOptions/types/HashOptionsRecord";

class CreateHashOptionsPropsNormalizer implements DbPropsNormalizer {
    normalizeInput (
        props: CreateHashOptionsProps
    ): CreateHashOptionsRecordProps {
        const {
            digest,
            iterations,
            keyLength,
            salt
        } = props;

        return {
            digest,
            iterations,
            key_length: keyLength,
            salt
        };
    }

    normalizeOutput (props: HashOptionsRecord): HashOptions {
        const {
            digest,
            id,
            iterations,
            key_length,
            salt
        } = props;

        return {
            digest,
            id,
            iterations,
            keyLength: key_length,
            salt
        };
    }
}

export default CreateHashOptionsPropsNormalizer;
