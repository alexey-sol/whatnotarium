export default interface HashPasswordResult {
    hash: Buffer;
    iterations: number;
    keyLength: number;
    salt: string;
}
