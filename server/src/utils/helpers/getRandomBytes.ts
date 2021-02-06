import { randomBytes } from "crypto";

function getRandomBytes (
    size = 128,
    encoding = "base64"
): string {
    return randomBytes(size).toString(encoding);
}

export default getRandomBytes;
