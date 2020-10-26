import PostItem from "#types/post/Item";
import ProfileItem from "#types/profile/Item";
import findUserProfile from "./findUserProfile";

async function complementPostItem ( // attachProfileToItem
    postItem: PostItem,
    profile?: ProfileItem
): Promise<PostItem> {
    const completedPostItem = { ...postItem };
    const shouldFindProfile = !postItem.author && !profile;

    if (profile) {
        completedPostItem.author = {
            name: profile.name,
            picture: profile.picture
        };
    } else if (shouldFindProfile) {
        completedPostItem.author = await findUserProfile(postItem.userId);
    }

    return completedPostItem;
}

export default complementPostItem;
