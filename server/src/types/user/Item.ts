import Profile from "#types/Profile";

interface Item {
    createdAt: Date;
    email: string;
    id: number;
    password: Buffer;
    profile?: Profile;
    updatedAt: Date;
}

export default Item;
