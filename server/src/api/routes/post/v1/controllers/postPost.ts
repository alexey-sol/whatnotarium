import { RequestHandler } from "express";

import PostService from "#services/PostService/v1";
import sendResponse from "#utils/http/sendResponse";

const postPost: RequestHandler = async (
    { body },
    response,
    next
): Promise<void> => {
    PostService.createPost(body)
        .then(post => sendResponse(response, post))
        .catch(next);
};

export default postPost;
