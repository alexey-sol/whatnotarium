import Comment from "#types/Comment";
import Profile from "#types/UserProfile";
import Status from "#types/post/Status";

interface Attributes {
    author?: Profile;
    body?: string;
    comments?: Comment[];
    createdAt?: Date;
    id?: number;
    rating?: number;
    status?: Status;
    title?: string;
    updatedAt?: Date;
    userId?: number;
    userIdsVotedDown?: number[];
    userIdsVotedUp?: number[];
    viewCount?: number;
}

export default Attributes;
