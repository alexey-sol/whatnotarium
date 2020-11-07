import HashOptions from "#types/UserHashOptions";
import Profile from "#types/UserProfile";

interface Attributes {
    createdAt?: Date;
    email?: string;
    hashOptions?: HashOptions;
    id?: number;
    profile?: Profile;
    updatedAt?: Date;
}

export default Attributes;
