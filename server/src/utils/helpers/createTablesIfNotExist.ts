import HashOptions from "#models/HashOptions";
import Post from "#models/Post";
import Profile from "#models/Profile";
import User from "#models/User";

async function createTablesIfNotExist (): Promise<void> {
    await User.up();
    await HashOptions.up();
    await Profile.up();
    await Post.up();
}

export default createTablesIfNotExist;
