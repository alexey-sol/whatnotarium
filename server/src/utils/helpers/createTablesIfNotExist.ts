import Post from "#models/Post";
import User from "#models/User";
import UserToken from "#models/UserToken";

async function createTablesIfNotExist (): Promise<void> {
    await User.up();
    await UserToken.up();
    await Post.up();
}

export default createTablesIfNotExist;
