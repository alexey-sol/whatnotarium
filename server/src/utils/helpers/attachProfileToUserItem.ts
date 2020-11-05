import ProfileItem from "#types/profile/Item";
import UserItem from "#types/user/Item";
import findUserProfile from "./findUserProfile";

async function attachProfileToUserItem (
    userItem: UserItem,
    profile?: ProfileItem
): Promise<UserItem> {
    const result = { ...userItem };
    delete result.password;

    const shouldFindProfile = !userItem.profile && !profile;

    if (profile) {
        const userProfile = {
            name: profile.name,
            picture: profile.picture
        };

        result.profile = userProfile;
    } else if (shouldFindProfile) {
        const userProfile = await findUserProfile(userItem.id);
        result.profile = userProfile;
    }

    return result;
}

export default attachProfileToUserItem;
