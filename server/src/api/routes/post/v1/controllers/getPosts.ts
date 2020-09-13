import { RequestHandler } from "express";

import Attributes from "#types/post/Attributes";
import PostService from "#services/PostService/v1";
import convertPaginOptsToFilter from "#utils/helpers/convertPaginOptsToFilter";
import sendResponse from "#utils/http/sendResponse";

const getPosts: RequestHandler = async (
    { query },
    response,
    next
): Promise<void> => {
    const filter = convertPaginOptsToFilter<Attributes>(query);

    PostService.findPosts(filter)
        .then(posts => sendResponse(response, posts))
        .catch(next);
};

export default getPosts;
