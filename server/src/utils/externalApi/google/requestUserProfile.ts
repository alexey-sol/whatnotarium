import request from "#utils/http/request";
import { RequestProfileSuccess } from "#types/externalApi/google/ResponseData";

export default async function (
    authToken: string
): Promise<RequestProfileSuccess | null> {
    return request({
        hostname: "www.googleapis.com",
        method: "GET",
        path: "/oauth2/v3/userinfo",
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    }) as unknown as RequestProfileSuccess | null;
}
