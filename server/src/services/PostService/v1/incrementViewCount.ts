import Post from "#models/Post";

interface Result {
    props: {
        id: number;
        viewCount: number;
    };
}

export default async function (post: Post): Promise<Result> | never {
    const viewCount = post.viewCount + 1;
    const options = { skipUpdatedAt: true };
    await post.updateAttributes({ viewCount }, undefined, options);

    return {
        props: {
            id: post.id,
            viewCount
        }
    };
}
