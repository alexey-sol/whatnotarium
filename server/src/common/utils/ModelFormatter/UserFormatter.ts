import FormattedProps from "models/User/types/FormattedProps";
import ModelFormatter from "types/ModelFormatter";
import RawProps from "models/User/types/RawProps";

class UserFormatter implements ModelFormatter<RawProps, FormattedProps> {
    toDbCase (props: FormattedProps): RawProps {
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

    fromDbCase (props: RawProps): FormattedProps {
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

export default UserFormatter;
