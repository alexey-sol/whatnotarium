import ProcessManager from "#utils/wrappers/ProcessManager";
import request from "#utils/http/request";
import { CommonFailure, RequestTokenSuccess } from "#types/externalApi/yandex/ResponseData";

export default async function (
    code: string
): Promise<RequestTokenSuccess | CommonFailure> {
    const { processEnv } = new ProcessManager();

    const {
        GOOGLE_CLIENT_ID: clientId,
        GOOGLE_CLIENT_SECRET: clientSecret
    } = processEnv;

    return request({
        hostname: "oauth2.googleapis.com",
        method: "POST",
        path: "/token"
    }, {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        redirect_uri: "https://a001d931dabb.ngrok.io/support/oauth/google"
    }) as unknown as RequestTokenSuccess | CommonFailure;
}
