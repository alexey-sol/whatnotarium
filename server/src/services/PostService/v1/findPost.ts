import Post from "#models/Post";

export default async function (
    id: number
): Promise<Post | null> {
    return Post.findById(id);
}
