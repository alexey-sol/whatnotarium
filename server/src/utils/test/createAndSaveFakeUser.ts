import { FakeDataOnUpdate } from "#root/src/types/test/user";
import Include from "#root/src/types/Include";
import User from "#models/User";
import generateFakeUserProps from "#utils/test/generateFakeUserProps";

async function createAndSaveFakeUser (
    options?: FakeDataOnUpdate,
    include?: Include[]
): Promise<User> {
    const userProps = await generateFakeUserProps(options);
    return User.create(userProps, include);
}

export default createAndSaveFakeUser;
