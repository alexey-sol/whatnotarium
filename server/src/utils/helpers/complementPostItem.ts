import PostItem from "#types/post/Item";
import ProfileItem from "#types/profile/Item";
import findUserProfile from "./findUserProfile";

async function complementPostItem (
    postItem: PostItem,
    profile?: ProfileItem
): Promise<PostItem> {
    const completedPostItem = { ...postItem };
    const shouldFindProfile = !postItem.author && !profile;

    if (profile) {
        const userProfile = {
            name: profile.name,
            picture: profile.picture
        };

        completedPostItem.author = userProfile;
    } else if (shouldFindProfile) {
        const userProfile = await findUserProfile(postItem.userId);
        completedPostItem.author = userProfile;
    }

    return completedPostItem;
}

export default complementPostItem;
