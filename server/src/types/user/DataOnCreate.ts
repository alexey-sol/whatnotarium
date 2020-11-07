
interface DataOnCreate {
    email: string;
    name: string;
    picture?: Buffer;
    hash: Buffer;
    digest: string;
    iterations: number;
    keyLength: number;
    salt: string;
}

export default DataOnCreate;
