import FormattedProps from "#types/post/FormattedProps";
import ModelFormatter from "./ModelFormatter";
import RawProps from "#types/post/RawProps";
import filterFalsyValues from "#utils/helpers/filterFalsyValues";

class PostFormatter extends ModelFormatter<RawProps, FormattedProps> {
    toDbCase (props: FormattedProps): RawProps {
        const {
            body,
            createdAt,
            id,
            title,
            updatedAt,
            userId
        } = props;

        return filterFalsyValues({
            body,
            created_at: createdAt,
            id,
            title,
            updated_at: updatedAt,
            user_id: userId
        });
    }

    fromDbCase (props: RawProps): FormattedProps {
        const shouldFormatProps = this.isDbCase(props);

        if (!shouldFormatProps) {
            return props;
        }

        const {
            body,
            created_at,
            id,
            title,
            updated_at,
            user_id
        } = props;

        return filterFalsyValues({
            body,
            createdAt: created_at,
            id,
            title,
            updatedAt: updated_at,
            userId: user_id
        });
    }
}

export default PostFormatter;
