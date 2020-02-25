import Indexer from "types/Indexer";

interface Props {
    email: string;
    hashOptionsId: number;
    name: string;
    password: Buffer;
}

type FormatCreateUserInput = (
    props: Props
) => Indexer<unknown>;

const formatCreateUserInput: FormatCreateUserInput = function (
    props: Props
): Indexer<unknown> {
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
};

export default formatCreateUserInput;
