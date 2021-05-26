import { CreateExtensions } from "#utils/sql/SchemaSqlGenerator";
import Post from "#models/Post";
import User from "#models/User";
import UserToken from "#models/UserToken";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function createTablesIfNotExist (): Promise<void> {
    await generateSqlAndQuery(new CreateExtensions());
    await User.up();
    await UserToken.up();
    await Post.up();
}

export default createTablesIfNotExist;
