import { join } from "path";
import fs from "fs";
import fetch from "node-fetch";

import generateId from "#utils/helpers/generateId";

const root = process.cwd();
const defaultFileName = generateId();
const defaultDirPath = join(root, "uploads");

interface Options {
    dir?: string;
    fileName?: string;
    fileExt?: string;
}

async function downloadFile (
    url: string, {
        dir = defaultDirPath,
        fileName = defaultFileName,
        fileExt
    }: Options
): Promise<string> {
    const response = await fetch(url);

    const fullFileName = (fileExt)
        ? `${fileName}.${fileExt}`
        : fileName;

    const filePath = join(dir, fullFileName);

    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(filePath);
        response.body.pipe(writeStream);
        writeStream.on("finish", () => resolve(filePath));
        writeStream.on("error", reject);
    });
}

export default downloadFile;
