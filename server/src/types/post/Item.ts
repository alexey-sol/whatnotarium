import Comment from "#types/Comment";
import Like from "#types/Like";
import UserProfile from "#types/UserProfile";

interface Item {
    author?: UserProfile;
    body: string;
    comments: Comment[];
    createdAt: Date;
    id: number;
    likes: Like[];
    title: string;
    updatedAt: Date;
    userId: number;
}

export default Item;
