import ConfirmToken from "#models/ConfirmToken";
import ConfirmTokenItem from "#types/confirmToken/Item";
import getRandomBytes from "#utils/helpers/getRandomBytes";

export default async function (
    userId: number
): Promise<ConfirmTokenItem> | never {
    const token = getRandomBytes(64);
    return ConfirmToken.create({ token, userId });
}
