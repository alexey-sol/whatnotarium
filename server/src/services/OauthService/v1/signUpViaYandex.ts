import OauthProcessor from "#utils/wrappers/OauthProcessor";
import UserItem from "#types/user/Item";
import requestToken from "#utils/externalApi/yandex/oauth/requestToken";
import requestUserProfile from "#utils/externalApi/yandex/oauth/requestUserProfile";

export default async function (
    code: string
): Promise<UserItem | null> | never {
    const api = { requestToken, requestUserProfile };
    const oauthProcessor = new OauthProcessor(code, api);
    return oauthProcessor.getResult();
}
