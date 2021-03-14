import UserToken from "#models/UserToken";
import ConfirmTokenItem from "#types/userToken/Item";
import generateId from "#utils/helpers/generateId";

interface Props {
    typeId: number;
    userId: number;
}

export default async function (
    props: Props
): Promise<ConfirmTokenItem> | never {
    const { typeId, userId } = props;
    const token = generateId(64);
    return UserToken.create({ token, typeId, userId });
}
