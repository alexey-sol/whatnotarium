import request from "#utils/http/request";
import { Success } from "#types/externalApi/yandex/RequestProfileResponse";

export default async function (
    authToken: string
): Promise<Success | null> {
    return request({
        hostname: "login.yandex.ru",
        method: "GET",
        path: "/info",
        headers: {
            "Authorization": `OAuth ${authToken}`
        }
    }) as unknown as Success | null;
}
