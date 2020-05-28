import { RequestHandler } from "express";

import PostService from "#services/PostService/v1";
import sendResponse from "#utils/http/sendResponse";

const getPosts: RequestHandler = async (
    { query },
    response,
    next
): Promise<void> => {
    PostService.findPosts(query)
        .then(posts => sendResponse(response, posts))
        .catch(next);
};

export default getPosts;
