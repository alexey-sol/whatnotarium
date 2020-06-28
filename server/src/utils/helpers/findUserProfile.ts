import Profile from "#models/Profile";
import UserProfile from "#types/UserProfile";

async function findUserProfile (
    userId: number
): Promise<UserProfile | undefined> {
    const foundProfile = await Profile.findOne({
        where: { userId }
    });

    if (foundProfile) {
        return {
            name: foundProfile.name,
            picture: foundProfile.picture
        };
    }
}

export default findUserProfile;
