import { RequestHandler } from "express";

import PostService from "#services/PostService/v1";
import sendResponse from "#utils/http/sendResponse";

const putView: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { post } = response.locals;

    PostService.incrementViewCount(post)
        .then(props => sendResponse(response, props))
        .catch(next);
};

export default putView;
