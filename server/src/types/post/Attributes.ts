import Comment from "#types/Comment";
import Like from "#types/Like";
import Profile from "#types/UserProfile";

interface Attributes {
    author?: Profile;
    body?: string;
    comments?: Comment[];
    createdAt?: Date;
    id?: number;
    likes?: Like[];
    title?: string;
    updatedAt?: Date;
    userId?: number;
}

export default Attributes;
