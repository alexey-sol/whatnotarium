import sharp from "sharp";

import { NOT_FOUND } from "#utils/const/validationErrors";
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

    const picture = file && await compressImageAndGetBuffer(file);
    const updatedUser = await user.updateAttributes({ picture });

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
        .resize(170, 170)
        .toFormat("png")
        .toBuffer();
}
