import status from "http-status";

import { Failure, Success } from "#types/externalApi/yandex/RequestTokenResponse";
import OauthError from "#utils/errors/OauthError";
import downloadUserPicture from "#utils/externalApi/yandex/downloadUserPicture";
import requestToken from "#utils/externalApi/yandex/requestToken";
import requestUserProfile from "#utils/externalApi/yandex/requestUserProfile";

export default async function (
    code: string
): Promise<unknown> {
    const response = await requestToken(code);
    const { error } = (response as Failure);
    const { access_token: accessToken } = (response as Success);

    if (error) {
        throw new OauthError(error, status.BAD_REQUEST);
    } else if (accessToken) {
        const profile = await requestUserProfile(accessToken);

        if (profile) {
            const hasPicture = !profile.is_avatar_empty;
            const pictureId = profile.default_avatar_id;
            let picturePath;

            if (hasPicture && pictureId) {
                picturePath = hasPicture && await downloadUserPicture(pictureId);
            }

            // TODO:
            // create user
            // create session
        }
    }

    return 1;
}
