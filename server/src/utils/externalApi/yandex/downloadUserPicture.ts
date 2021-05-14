import { join } from "path";

import downloadFile from "#utils/http/downloadFile";
import generateId from "#utils/helpers/generateId";

const root = process.cwd();
const fileName = generateId();
const defaultFilePath = join(root, "uploads", `${fileName}.png`);

export default async function (
    pictureId: string,
    pictureSize = "islands-200",
    filePath = defaultFilePath
): Promise<string> {
    return downloadFile(
        `https://avatars.yandex.net/get-yapic/${pictureId}/${pictureSize}`,
        filePath
    );
}
