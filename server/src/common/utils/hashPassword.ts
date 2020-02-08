import { pbkdf2Sync } from "pbkdf2";
import crypto from "crypto";

import HashPasswordResult from "types/HashPasswordResult";

type HashPassword = (
    password: string | Buffer,
    digest?: string
) => HashPasswordResult;

const hashPassword: HashPassword = function (
    password: string | Buffer,
    digest = "sha512"
): HashPasswordResult {
    const salt = crypto.randomBytes(128).toString("base64");
    const iterations = 10000;
    const keyLength = 32;

    const hash = pbkdf2Sync(
        password,
        salt,
        iterations,
        keyLength,
        digest
    );

    return {
        hash,
        iterations,
        keyLength,
        salt
    };
};

export default hashPassword;
