import fs from "fs";

import { NOT_FOUND } from "#utils/const/validationErrors";
import Profile from "#models/Profile";
import ProfileAttributes from "#types/profile/Attributes";
import ProfileError from "#utils/errors/ProfileError";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import UserItem from "#types/user/Item";
import complementUserItem from "#utils/helpers/complementUserItem";

const fsPromises = fs.promises;

export default async function (
    id: number,
    file: Express.Multer.File
): Promise<UserItem> | never {
    const user = await User.findById(id);

    if (!user) {
        throw new UserError(NOT_FOUND, 404);
    }

    // TODO: compress img with Sharp
    let picture;

    if (file) {
        picture = await fsPromises.readFile(file.path);
    }

    const profile = await updateProfile({
        picture,
        userId: user.id
    });

    return complementUserItem(user, profile);
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
