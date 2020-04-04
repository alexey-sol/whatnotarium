import FormattedProps from "user/model/types/FormattedProps";
import ModelFormatter from "types/ModelFormatter";
import RawProps from "user/model/types/RawProps";

class UserFormatter implements ModelFormatter<RawProps, FormattedProps> {
    toDbCase (props: FormattedProps): RawProps {
        const {
            email,
            name,
            password,
            updatedAt
        } = props;

        return {
            email,
            name,
            password,
            updated_at: updatedAt
        };
    }

    fromDbCase (props: RawProps): FormattedProps {
        const {
            created_at,
            email,
            id,
            name,
            password,
            updated_at
        } = props;

        return {
            createdAt: created_at,
            email,
            id,
            name,
            password,
            updatedAt: updated_at
        };
    }
}

export default UserFormatter;
