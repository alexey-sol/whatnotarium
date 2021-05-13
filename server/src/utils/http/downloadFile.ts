import fs from "fs";
import fetch from "node-fetch";

async function downloadFile (
    url: string,
    filePath: string
): Promise<string> {
    const response = await fetch(url);

    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(filePath);
        response.body.pipe(writeStream);
        writeStream.on("finish", () => resolve(filePath));
        writeStream.on("error", reject);
    });
}

export default downloadFile;
