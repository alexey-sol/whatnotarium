import sharp from "sharp";

import { NOT_FOUND } from "#utils/const/validationErrors";
import { PROFILES } from "#utils/const/database/tableNames";
import { USER_PIC_SIZE } from "#utils/const/defaultValues";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import UserItem from "#types/user/Item";
import unlinkFiles from "#utils/helpers/unlinkFiles";

export default async function (
    id: number,
    file?: Express.Multer.File
): Promise<UserItem> | never {
    const user = await User.findById(id);

    if (!user) {
        throw new UserError(NOT_FOUND, 404);
    }

    const includeProfile = {
        as: "profile",
        attributes: ["about", "birthdate", "lastActivityDate", "name", "picture", "totalVoteCount"],
        referencedKey: "userId",
        ownKey: "id",
        tableName: PROFILES
    };

    const picture = (file)
        ? await compressImageAndGetBuffer(file)
        : null;

    const updatedUser = await user.updateAttributes({ picture }, [includeProfile]);

    if (file) {
        await unlinkFiles(file.path);
    }

    return updatedUser;
}

async function compressImageAndGetBuffer (
    file: Express.Multer.File
): Promise<Buffer> {
    return sharp(file.path)
        .withMetadata()
        .rotate()
        .resize(USER_PIC_SIZE, USER_PIC_SIZE)
        .toFormat("png")
        .toBuffer();
}
