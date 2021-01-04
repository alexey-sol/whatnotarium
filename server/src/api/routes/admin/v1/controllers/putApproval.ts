import { RequestHandler } from "express";

import PostService from "#services/PostService/v1";
import sendResponse from "#utils/http/sendResponse";

const putApproval: RequestHandler = async (
    { body, params },
    response,
    next
): Promise<void> => {
    const { id } = params;
    const { isApproved } = body;

    PostService.updatePost(+id, { isApproved })
        .then(post => sendResponse(response, post))
        .catch(next);
};

export default putApproval;
