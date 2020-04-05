import { pbkdf2, randomBytes } from "crypto";

import HashPasswordOptions from "#types/HashPasswordOptions";
import HashPasswordResult from "#types/HashPasswordResult";

async function hashPassword (
    password: string,
    options = getDefaultOptions()
): Promise<HashPasswordResult> {
    const {
        digest,
        iterations,
        keyLength,
        salt
    } = options;

    const hash: Buffer = await new Promise((resolve, reject) => pbkdf2(
        password,
        salt,
        iterations,
        keyLength,
        digest,
        (error, hash) => error ? reject(error) : resolve(hash)
    ));

    return {
        ...options,
        hash
    };
}

export default hashPassword;

function getDefaultOptions (): HashPasswordOptions {
    return {
        digest: "sha512",
        iterations: 10000,
        keyLength: 32,
        salt: getSalt()
    };
}

function getSalt (): string {
    return randomBytes(128).toString("base64");
}
