import sharp from "sharp";

import { NOT_FOUND } from "#utils/const/validationErrors";
import Profile from "#models/Profile";
import ProfileAttributes from "#types/profile/Attributes";
import ProfileError from "#utils/errors/ProfileError";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import UserItem from "#types/user/Item";
import attachProfileToUserItem from "#utils/helpers/attachProfileToUserItem";
import unlinkFiles from "#utils/helpers/unlinkFiles";

export default async function (
    id: number,
    file?: Express.Multer.File
): Promise<UserItem> | never {
    const user = await User.findById(id);

    if (!user) {
        throw new UserError(NOT_FOUND, 404);
    }

    const picture = file && await compressImageAndGetBuffer(file);

    const profile = await updateProfile({
        picture,
        userId: user.id
    });

    if (file) {
        await unlinkFiles(file.path);
    }

    return attachProfileToUserItem(user, profile);
}

async function compressImageAndGetBuffer (
    file: Express.Multer.File
): Promise<Buffer> {
    return sharp(file.path)
        .withMetadata()
        .rotate()
        .resize(170, 170)
        .toFormat("png")
        .toBuffer();
}

async function updateProfile (
    props: ProfileAttributes
): Promise<Profile> | never {
    const profile = await Profile.findOne({
        where: { userId: props.userId }
    });

    if (!profile) {
        throw new ProfileError(NOT_FOUND, 404);
    }

    return profile.updateAttributes(props);
}
