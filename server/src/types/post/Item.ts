import Comment from "#types/Comment";
import Profile from "#types/UserProfile";
import Status from "#types/post/Status";

interface Item {
    author: Profile;
    body: string;
    comments: Comment[];
    createdAt: Date;
    id: number;
    status: Status;
    rating: number;
    title: string;
    updatedAt: Date;
    userId: number;
    userIdsVotedDown: number[];
    userIdsVotedUp: number[];
    viewCount: number;
}

export default Item;
