import Profile from "#types/Profile";

interface Attributes {
    author?: Profile;
    body?: string;
    createdAt?: Date;
    id?: number;
    title?: string;
    updatedAt?: Date;
    userId?: number;
}

export default Attributes;
