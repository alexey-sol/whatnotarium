import ConfirmTokenItem from "#types/userToken/Item";
import CreateUserTokenDto from "#root/src/types/userToken/CreateUserTokenDto";
import UserToken from "#models/UserToken";
import generateId from "#utils/helpers/generateId";

export default async function (
    props: CreateUserTokenDto
): Promise<ConfirmTokenItem> | never {
    const { typeId, userId } = props;
    const token = generateId(64);
    return UserToken.create({ token, typeId, userId });
}
