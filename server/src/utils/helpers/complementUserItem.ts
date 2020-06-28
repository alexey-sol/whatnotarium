import ProfileItem from "#types/profile/Item";
import UserItem from "#types/user/Item";
import findUserProfile from "./findUserProfile";

async function complementUserItem (
    userItem: UserItem,
    profile?: ProfileItem
): Promise<UserItem> {
    const completedUserItem = { ...userItem };
    delete completedUserItem.password;

    const shouldFindProfile = !userItem.profile && !profile;

    if (profile) {
        const userProfile = {
            name: profile.name,
            picture: profile.picture
        };

        completedUserItem.profile = userProfile;
    } else if (shouldFindProfile) {
        const userProfile = await findUserProfile(userItem.id);
        completedUserItem.profile = userProfile;
    }

    return completedUserItem;
}

export default complementUserItem;
