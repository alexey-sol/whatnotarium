import Post from "#models/Post";
import User from "#models/User";

async function createTablesIfNotExist (): Promise<void> {
    await User.up();
    await Post.up();
}

export default createTablesIfNotExist;
