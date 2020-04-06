import FormattedProps from "#types/user/FormattedProps";
import ModelFormatter from "#types/ModelFormatter";
import RawProps from "#types/user/RawProps";
import filterFalsyValues from "#utils/helpers/filterFalsyValues";

class UserFormatter implements ModelFormatter<RawProps, FormattedProps> {
    toDbCase (props: FormattedProps): RawProps {
        const {
            email,
            name,
            password,
            updatedAt
        } = props;

        return filterFalsyValues({
            email,
            name,
            password,
            updated_at: updatedAt
        });
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

        return filterFalsyValues({
            createdAt: created_at,
            email,
            id,
            name,
            password,
            updatedAt: updated_at
        });
    }
}

export default UserFormatter;
