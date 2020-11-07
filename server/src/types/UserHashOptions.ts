interface UserHashOptions {
    digest: string;
    hash: Buffer;
    iterations: number;
    keyLength: number;
    salt: string;
}

export default UserHashOptions;
