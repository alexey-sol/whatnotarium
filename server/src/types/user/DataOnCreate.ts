interface DataOnCreate {
    birthdate?: Date;
    digest?: string;
    email: string;
    hash?: Buffer;
    isConfirmed?: boolean;
    isOauth?: boolean;
    iterations?: number;
    keyLength?: number;
    name: string;
    picture?: Buffer;
    salt?: string;
}

export default DataOnCreate;
