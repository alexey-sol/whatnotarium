import ProcessManager from "#utils/wrappers/ProcessManager";
import request from "#utils/http/request";
import { Failure, Success } from "#types/externalApi/yandex/RequestTokenResponse";

export default async function (
    code: string
): Promise<Success | Failure> {
    const { processEnv } = new ProcessManager();

    const {
        YANDEX_CLIENT_ID: clientId,
        YANDEX_CLIENT_SECRET: clientSecret
    } = processEnv;

    const encodedAuth = Buffer.from(`${clientId}:${clientSecret}`)
        .toString("base64");

    return request({
        hostname: "oauth.yandex.ru",
        method: "POST",
        path: "/token",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${encodedAuth}`
        }
    }, {
        code,
        grant_type: "authorization_code"
    }) as unknown as Success | Failure;
}
