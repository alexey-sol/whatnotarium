import Profile from "#types/Profile";

interface Attributes {
    createdAt?: Date;
    email?: string;
    id?: number;
    password?: Buffer;
    profile?: Profile;
    updatedAt?: Date;
}

export default Attributes;
