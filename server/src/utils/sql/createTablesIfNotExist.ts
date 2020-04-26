import HashOptions from "#models/HashOptions";
import User from "#models/User";

async function createTablesIfNotExist (): Promise<void> {
    await User.up();
    await HashOptions.up();
}

export default createTablesIfNotExist;
