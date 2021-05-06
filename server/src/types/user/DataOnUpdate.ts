interface DataOnUpdate {
    digest?: string;
    email?: string;
    hash?: Buffer;
    isConfirmed?: boolean;
    iterations?: number;
    keyLength?: number;
    lastActivityDate?: Date;
    name?: string;
    picture?: Express.Multer.File | Buffer | null;
    salt?: string;
}

export default DataOnUpdate;
