import { Providers, Types } from "#types/externalApi/common/oauth/meta";
import { ResponseWithMeta } from "#types/externalApi/common/oauth/ResponseData";
import { TokenFailure, Token } from "#types/externalApi/google/oauth/ResponseData";
import ProcessManager from "#utils/wrappers/ProcessManager";
import isOfType from "#utils/typeGuards/isOfType";
import request from "#utils/http/request";

export default async function (
    code: string
): Promise<ResponseWithMeta<Token>> {
    const { processEnv } = new ProcessManager();

    const {
        GOOGLE_CLIENT_ID: clientId,
        GOOGLE_CLIENT_SECRET: clientSecret,
        GOOGLE_OAUTH_REDIRECT_URI: redirectUri
    } = processEnv;

    const value = await request({
        hostname: "oauth2.googleapis.com",
        method: "POST",
        path: "/token"
    }, {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        redirect_uri: redirectUri
    }) as unknown as Token;

    return {
        value,
        provider: Providers.google,
        type: (isOfType<TokenFailure>(value, "error"))
            ? Types.failure
            : Types.success
    };
}
