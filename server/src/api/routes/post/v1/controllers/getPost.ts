import { RequestHandler } from "express";

import PostService from "#services/PostService/v1";
import sendResponse from "#utils/http/sendResponse";

const getPost: RequestHandler = async (
    { params },
    response,
    next
): Promise<void> => {
    const { id } = params;

    PostService.findPost(+id)
        .then(post => sendResponse(response, post))
        .catch(next);
};

export default getPost;
