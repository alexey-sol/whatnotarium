import FormattedProps from "@hashOptions/model/types/FormattedProps";
import ModelFormatter from "@common/types/ModelFormatter";
import RawProps from "@hashOptions/model/types/RawProps";

class HashOptionsFormatter implements ModelFormatter<RawProps, FormattedProps> {
    toDbCase (props: FormattedProps): RawProps {
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

    fromDbCase (props: RawProps): FormattedProps {
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

export default HashOptionsFormatter;
