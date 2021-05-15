import { promises as fs } from "fs";
import status from "http-status";

import { CommonFailure, RequestProfileSuccess } from "#types/externalApi/google/ResponseData";
import { INVALID_REQUEST } from "#utils/const/oauthErrors";
import DataOnCreate from "#types/user/DataOnCreate";
import OauthError from "#utils/errors/OauthError";
import UserItem from "#types/user/Item";
import UserService from "#services/UserService/v1";
import downloadUserPicture from "#utils/externalApi/google/downloadUserPicture";
import isOfType from "#utils/typeGuards/isOfType";
import requestToken from "#utils/externalApi/google/requestToken";
import requestUserProfile from "#utils/externalApi/google/requestUserProfile";
import unlinkFiles from "#utils/helpers/unlinkFiles";

export default async function (
    code: string
): Promise<UserItem | null> | never {
    const response = await requestToken(code);

    if (isOfType<CommonFailure>(response, "error")) {
        throw new OauthError(response.error, status.BAD_REQUEST);
    }

    const profile = await requestUserProfile(response.access_token);

    if (!profile) {
        throw new OauthError(INVALID_REQUEST, status.BAD_REQUEST);
    }

    const { email } = profile;
    const usersList = await UserService.findUsers({
        where: { email }
    });

    let user = usersList.items[0];

    if (!user) {
        const props = await getUserProps(profile);
        user = await UserService.createUser(props);
    } else if (user && !user.isConfirmed) {
        await UserService.updateUser(user.id, { isConfirmed: true });
    }

    return user;
}

async function getUserProps (profile: RequestProfileSuccess): Promise<DataOnCreate> {
    const pictureUrl = profile.picture;

    let picturePath;
    let picture;

    if (pictureUrl) {
        picturePath = await downloadUserPicture(pictureUrl.replace(/=s\d+/g, "=s170"));
        picture = await fs.readFile(picturePath);

        if (picture && picturePath) {
            await unlinkFiles(picturePath);
        }
    }

    return {
        email: profile.email,
        isConfirmed: true,
        name: profile.name,
        picture
    };
}
