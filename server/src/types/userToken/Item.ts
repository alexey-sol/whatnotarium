import UserEmail from "#types/UserEmail";

interface Item {
    createdAt: Date;
    expirationDate: Date;
    id: number;
    token: string;
    typeId: number;
    user?: UserEmail;
    userId: number;
}

export default Item;
