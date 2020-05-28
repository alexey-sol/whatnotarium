import Post from "#models/Post";

export default async function (
    id: number
): Promise<number | null> {
    return Post.destroyById(id);
}
