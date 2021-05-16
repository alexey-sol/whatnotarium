import { Profile } from "#types/externalApi/yandex/oauth/ResponseData";
import { Providers, Types } from "#types/externalApi/common/oauth/meta";
import { ResponseWithMeta } from "#types/externalApi/common/oauth/ResponseData";
import request from "#utils/http/request";

export default async function (
    authToken: string
): Promise<ResponseWithMeta<Profile | null>> {
    const value = await request({
        hostname: "login.yandex.ru",
        method: "GET",
        path: "/info",
        headers: {
            Authorization: `OAuth ${authToken}`
        }
    }) as unknown as Profile | null;

    return {
        value,
        provider: Providers.yandex,
        type: (value)
            ? Types.success
            : Types.failure
    };
}
