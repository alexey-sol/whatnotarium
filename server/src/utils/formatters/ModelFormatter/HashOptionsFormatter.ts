import FormattedProps from "#types/hashOptions/FormattedProps";
import ModelFormatter from "#types/ModelFormatter";
import RawProps from "#types/hashOptions/RawProps";
import filterFalsyValues from "#utils/helpers/filterFalsyValues";

class HashOptionsFormatter implements ModelFormatter<RawProps, FormattedProps> {
    toDbCase (props: FormattedProps): RawProps {
        const {
            digest,
            iterations,
            keyLength,
            salt,
            userId
        } = props;

        return filterFalsyValues({
            digest,
            iterations,
            key_length: keyLength,
            salt,
            user_id: userId
        });
    }

    fromDbCase (props: RawProps): FormattedProps {
        const {
            digest,
            id,
            iterations,
            key_length,
            salt,
            user_id
        } = props;

        return filterFalsyValues({
            digest,
            id,
            iterations,
            keyLength: key_length,
            salt,
            userId: user_id
        });
    }
}

export default HashOptionsFormatter;
