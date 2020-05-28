import { RequestHandler } from "express";

import PostService from "#services/PostService/v1";
import sendResponse from "#utils/http/sendResponse";

const putPost: RequestHandler = async (
    { body, params },
    response,
    next
): Promise<void> => {
    const { id } = params;

    PostService.updatePost(+id, body)
        .then(post => sendResponse(response, post))
        .catch(next);
};

export default putPost;
