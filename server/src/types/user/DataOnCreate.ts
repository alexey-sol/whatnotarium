interface DataOnCreate {
    digest: string;
    email: string;
    hash: Buffer;
    isConfirmed?: boolean;
    iterations: number;
    keyLength: number;
    name: string;
    picture?: Buffer;
    salt: string;
}

export default DataOnCreate;
