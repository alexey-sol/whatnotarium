import { pbkdf2, randomBytes } from "crypto";

import HashPasswordOptions from "#types/HashPasswordOptions";
import HashPasswordResult from "#types/HashPasswordResult";

async function hashPassword (
    password: string,
    options = {}
): Promise<HashPasswordResult> {
    const supplementedOptions = {
        ...getDefaultOptions(),
        ...options
    };

    const {
        digest,
        iterations,
        keyLength,
        salt
    } = supplementedOptions;

    const hash: Buffer = await new Promise((resolve, reject) => pbkdf2(
        password,
        salt,
        iterations,
        keyLength,
        digest,
        (error, hash) => error ? reject(error) : resolve(hash)
    ));

    return {
        ...supplementedOptions,
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
