import request from "#utils/http/request";
import { RequestProfileSuccess } from "#types/externalApi/yandex/ResponseData";

export default async function (
    authToken: string
): Promise<RequestProfileSuccess | null> {
    return request({
        hostname: "login.yandex.ru",
        method: "GET",
        path: "/info",
        headers: {
            "Authorization": `OAuth ${authToken}`
        }
    }) as unknown as RequestProfileSuccess | null;
}
