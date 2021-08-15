import { join } from "path";
import fetch from "node-fetch";
import fs from "fs";

import { IMAGE_EXT } from "#utils/const/defaultValues";
import unlinkFiles from "#utils/helpers/unlinkFiles";
import generateId from "#utils/helpers/generateId";

const root = process.cwd();
const defaultFileName = generateId();
const defaultDirPath = join(root, "uploads");

interface Options {
    dir?: string;
    fileName?: string;
    fileExt?: string;
}

class Download {
    constructor (
        private url: string,
        private options: Options = {}
    ) {
        this.url = url;
        this.options = options;
    }

    async getFile (): Promise<Buffer> | never {
        const filePath = await this.downloadFile();
        const file = await fs.promises.readFile(filePath);

        if (file && filePath) {
            await unlinkFiles(filePath);
        }

        return file;
    }

    private async downloadFile (): Promise<string> {
        const {
            dir = defaultDirPath,
            fileName = defaultFileName,
            fileExt = IMAGE_EXT
        } = this.options;

        const response = await fetch(this.url);

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
}

export default Download;
