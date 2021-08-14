import { FakeDataOnUpdate } from "#root/src/types/test/post";
import Include from "#root/src/types/Include";
import Post from "#models/Post";
import generateFakePostProps from "#utils/test/generateFakePostProps";

async function createAndSaveFakePost (
    options?: FakeDataOnUpdate,
    include?: Include[]
): Promise<Post> {
    const postProps = await generateFakePostProps(options);
    return Post.create(postProps, include);
}

export default createAndSaveFakePost;
