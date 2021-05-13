import { join } from "path";

import downloadFile from "#utils/http/downloadFile";
import generateId from "#utils/helpers/generateId";

export default async function (
    pictureId: string,
    pictureSize = "islands-200"
): Promise<string> {
    const root = process.cwd();
    const fileName = generateId();
    const filePath = join(root, "uploads", `${fileName}.jpg`);

    return downloadFile(
        `https://avatars.yandex.net/get-yapic/${pictureId}/${pictureSize}`,
        filePath
    );
}
