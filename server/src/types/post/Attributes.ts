import Comment from "#types/Comment";
import Profile from "#types/UserProfile";

interface Attributes {
    author?: Profile;
    body?: string;
    comments?: Comment[];
    createdAt?: Date;
    id?: number;
    isApproved?: boolean;
    isFrozen?: boolean;
    rating?: number;
    title?: string;
    updatedAt?: Date;
    userId?: number;
    userIdsVotedDown?: number[];
    userIdsVotedUp?: number[];
    viewCount?: number;
}

export default Attributes;
