import { pbkdf2Sync } from "pbkdf2";
import crypto from "crypto";

import HashPasswordOptions from "types/HashPasswordOptions";
import HashPasswordResult from "types/HashPasswordResult";

type HashPassword = (
    password: string | Buffer,
    options?: HashPasswordOptions
) => HashPasswordResult;

const hashPassword: HashPassword = function (
    password: string | Buffer,
    options = getDefaultOptions()
): HashPasswordResult {
    const {
        digest,
        iterations,
        keyLength,
        salt
    } = options;

    const hash = pbkdf2Sync(
        password,
        salt,
        iterations,
        keyLength,
        digest
    );

    return {
        ...options,
        hash
    };
};

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
    return crypto.randomBytes(128).toString("base64");
}
