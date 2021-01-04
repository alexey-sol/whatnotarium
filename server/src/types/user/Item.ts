import HashOptions from "#types/UserHashOptions";
import Profile from "#types/UserProfile";

interface Item {
    about: string;
    createdAt: Date;
    email: string;
    hashOptions?: HashOptions;
    id: number;
    isAdmin: boolean;
    profile?: Profile;
    updatedAt: Date;
}

export default Item;
