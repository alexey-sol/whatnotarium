import HashPasswordOptions from "types/HashPasswordOptions";
import Indexer from "types/Indexer";

type FormatCreateHashOptionsInput = (
    props: HashPasswordOptions
) => Indexer<unknown>;

const formatCreateHashOptionsInput: FormatCreateHashOptionsInput = function (
    props: HashPasswordOptions
): Indexer<unknown> {
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
};

export default formatCreateHashOptionsInput;
