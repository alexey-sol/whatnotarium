import Profile from "#types/UserProfile";

interface Attributes {
    author?: Profile;
    body?: string;
    createdAt?: Date;
    id?: number;
    likeCount?: number;
    title?: string;
    updatedAt?: Date;
    userId?: number;
}

export default Attributes;
