import Comment from "#types/Comment";
import Profile from "#types/UserProfile";

interface Item {
    author?: Profile;
    body: string;
    comments: Comment[];
    createdAt: Date;
    id: number;
    rating: number;
    title: string;
    updatedAt: Date;
    userId: number;
    userIdsVotedDown: number[];
    userIdsVotedUp: number[];
    viewCount: number;
}

export default Item;
