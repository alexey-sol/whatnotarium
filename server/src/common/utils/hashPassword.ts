import { pbkdf2Sync } from "pbkdf2";
import crypto from "crypto";

import HashPasswordResult from "types/HashPasswordResult";

interface Options {
    digest: string;
    iterations: number;
    keyLength: number;
    salt: string;
}

type HashPassword = (
    password: string | Buffer,
    options?: Options
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
        digest,
        hash,
        iterations,
        keyLength,
        salt
    };
};

export default hashPassword;

function getDefaultOptions (): Options {
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
