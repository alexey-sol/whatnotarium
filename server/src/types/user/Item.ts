import UserProfile from "#types/UserProfile";

interface Item {
    createdAt: Date;
    email: string;
    id: number;
    password: Buffer;
    profile?: UserProfile;
    updatedAt: Date;
}

export default Item;
