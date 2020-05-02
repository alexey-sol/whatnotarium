import FormattedProps from "#types/user/FormattedProps";
import ModelFormatter from "./ModelFormatter";
import RawProps from "#types/user/RawProps";
import filterFalsyValues from "#utils/helpers/filterFalsyValues";

class UserFormatter extends ModelFormatter<RawProps, FormattedProps> {
    toDbCase (props: FormattedProps): RawProps {
        const {
            createdAt,
            email,
            id,
            name,
            password,
            updatedAt
        } = props;

        return filterFalsyValues({
            created_at: createdAt,
            email,
            id,
            name,
            password,
            updated_at: updatedAt
        });
    }

    fromDbCase (props: RawProps): FormattedProps {
        const shouldFormatProps = this.isDbCase(props);

        if (!shouldFormatProps) {
            return props;
        }

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
