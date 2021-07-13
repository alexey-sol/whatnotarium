import { PROFILES } from "#utils/const/database/tableNames";
import CreatePostDto from "#types/post/CreatePostDto";
import Post from "#models/Post";
import PostItem from "#types/post/Item";

export default async function (
    props: CreatePostDto
): Promise<PostItem> | never {
    const include = [{
        as: "author",
        attributes: ["about", "birthdate", "lastActivityDate", "name", "picture", "totalVoteCount"],
        referencedKey: "userId",
        ownKey: "userId",
        tableName: PROFILES
    }];

    return Post.create(props, include);
}
