import UserProfile from "#types/UserProfile";

interface Item {
    author?: UserProfile;
    body: string;
    createdAt: Date;
    id: number;
    title: string;
    updatedAt: Date;
    userId: number;
}

export default Item;
