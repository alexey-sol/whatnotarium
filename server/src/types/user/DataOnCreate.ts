interface DataOnCreate {
    birthdate?: Date;
    digest?: string;
    email: string;
    hash?: Buffer;
    isAdmin?: boolean;
    isConfirmed?: boolean;
    iterations?: number;
    keyLength?: number;
    lastActivityDate?: Date;
    name: string;
    picture?: Buffer | null;
    salt?: string;
}

export default DataOnCreate;
