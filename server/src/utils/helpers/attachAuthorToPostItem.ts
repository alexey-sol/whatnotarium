import PostItem from "#types/post/Item";
import ProfileItem from "#types/profile/Item";
import findUserProfile from "./findUserProfile";

async function attachAuthorToPostItem (
    postItem: PostItem,
    profile?: ProfileItem
): Promise<PostItem> {
    const result = { ...postItem };
    const shouldFindProfile = !postItem.author && !profile;

    if (profile) {
        result.author = {
            name: profile.name,
            picture: profile.picture
        };
    } else if (shouldFindProfile) {
        result.author = await findUserProfile(postItem.userId);
    }

    return result;
}

export default attachAuthorToPostItem;
