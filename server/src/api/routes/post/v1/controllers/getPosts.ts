import { RequestHandler } from "express";

import Attributes from "#types/post/Attributes";
import PostService from "#services/PostService/v1";
import convertPagingOptsToFilter from "#utils/helpers/convertPagingOptsToFilter";
import sendResponse from "#utils/http/sendResponse";

const getPosts: RequestHandler = async (
    { query },
    response,
    next
): Promise<void> => {
    const { count, page } = query;
    const filter = convertPagingOptsToFilter<Attributes>({ ...query });

    PostService.findPosts(filter)
        .then(posts => sendResponse(response, { ...posts, count, page }))
        .catch(next);
};

export default getPosts;
