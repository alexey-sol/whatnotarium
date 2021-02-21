import UserToken from "#models/UserToken";
import ConfirmTokenItem from "#types/userToken/Item";
import getRandomBytes from "#utils/helpers/getRandomBytes";

interface Props {
    typeId: number;
    userId: number;
}

export default async function (
    props: Props
): Promise<ConfirmTokenItem> | never {
    const { typeId, userId } = props;
    const token = getRandomBytes(64);
    return UserToken.create({ token, typeId, userId });
}
