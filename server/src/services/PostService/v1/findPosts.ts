import { PROFILES } from "#utils/const/database/tableNames";
import FetchedList from "#types/FetchedList";
import Post from "#models/Post";
import PostItem from "#types/post/Item";
import complementPostItem from "#utils/helpers/complementPostItem";

type PostItemsList = FetchedList<PostItem>;

interface Options {
    limit?: number;
    offset?: number;
    userId?: number;
}

export default async function (
    options: Options = {}
): Promise<PostItemsList> {
    const { limit, offset, userId } = options;

    const include = [{
        as: "author",
        attributes: ["name", "picture"],
        referencedKey: "userId",
        ownKey: "userId",
        tableName: PROFILES
    }];

    const filter = {
        include,
        limit,
        offset,
        where: {}
    };

    if (userId) {
        filter.where = { userId };
    }

    const posts = await Post.findAll(filter);
    const completedPosts = [];

    for (const post of posts) {
        completedPosts.push(await complementPostItem(post));
    }

    return {
        items: completedPosts,
        totalCount: await Post.count()
    };
}
