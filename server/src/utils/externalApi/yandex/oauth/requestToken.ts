import { Providers, Types } from "#types/externalApi/common/oauth/meta";
import { ResponseWithMeta } from "#types/externalApi/common/oauth/ResponseData";
import { Token, TokenFailure } from "#types/externalApi/yandex/oauth/ResponseData";
import ProcessManager from "#utils/wrappers/ProcessManager";
import isOfType from "#utils/typeGuards/isOfType";
import request from "#utils/http/request";

export default async function (
    code: string
): Promise<ResponseWithMeta<Token>> {
    const { processEnv } = new ProcessManager();

    const {
        YANDEX_CLIENT_ID: clientId,
        YANDEX_CLIENT_SECRET: clientSecret
    } = processEnv;

    const encodedAuth = Buffer.from(`${clientId}:${clientSecret}`)
        .toString("base64");

    const value = await request({
        hostname: "oauth.yandex.ru",
        method: "POST",
        path: "/token",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${encodedAuth}`
        }
    }, {
        code,
        grant_type: "authorization_code"
    }) as unknown as Token;

    return {
        value,
        provider: Providers.yandex,
        type: (isOfType<TokenFailure>(value, "error"))
            ? Types.failure
            : Types.success
    };
}
