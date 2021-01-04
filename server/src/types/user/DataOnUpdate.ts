
interface DataOnUpdate {
    email?: string;
    name?: string;
    picture?: Express.Multer.File | Buffer | null;
    hash?: Buffer;
    digest?: string;
    iterations?: number;
    keyLength?: number;
    salt?: string;
}

export default DataOnUpdate;
