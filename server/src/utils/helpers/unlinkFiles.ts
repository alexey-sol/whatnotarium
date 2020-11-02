import fs from "fs";

async function unlinkFiles (...filePaths: string[]): Promise<void> {
    const functions = filePaths.map(filePath => {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (error) => (error)
                ? reject(error)
                : resolve());
        });
    });

    await Promise.all(functions);
}

export default unlinkFiles;
