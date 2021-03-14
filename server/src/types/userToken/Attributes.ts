import UserEmail from "#types/UserEmail";

interface Attributes {
    createdAt?: Date;
    expirationDate?: Date;
    id?: number;
    token?: string;
    typeId?: number;
    user?: UserEmail;
    userId?: number;
}

export default Attributes;
