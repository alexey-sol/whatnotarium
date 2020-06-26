import { PROFILES } from "#utils/const/database/tableNames";
import FetchedList from "#types/FetchedList";
import Post from "#models/Post";

type PostsList = FetchedList<Post>;

interface Options {
    limit?: number;
    offset?: number;
    userId?: number;
}

export default async function (
    options: Options = {}
): Promise<PostsList> {
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

    return {
        items: await Post.findAll(filter),
        totalCount: await Post.count()
    };
}
