interface DataOnCreate {
    birthdate?: Date;
    digest?: string;
    email: string;
    hash?: Buffer;
    isConfirmed?: boolean;
    iterations?: number;
    keyLength?: number;
    lastActivityDate?: Date;
    name: string;
    picture?: Buffer;
    salt?: string;
}

export default DataOnCreate;
