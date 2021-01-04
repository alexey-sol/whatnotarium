import { RequestHandler } from "express";

import PostService from "#services/PostService/v1";
import sendResponse from "#utils/http/sendResponse";

const putApproval: RequestHandler = async (
    { body, params },
    response,
    next
): Promise<void> => {
    const { id } = params;
    const { status } = body;

    PostService.updatePost(+id, { status })
        .then(post => sendResponse(response, post))
        .catch(next);
};

export default putApproval;
