export default interface HashPasswordResult {
    iterations: number;
    hash: Buffer;
    keyLength: number;
    salt: string;
}
