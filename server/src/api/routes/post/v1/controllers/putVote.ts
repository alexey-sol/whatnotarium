import { RequestHandler } from "express";

import PostService from "#services/PostService/v1";
import sendResponse from "#utils/http/sendResponse";

const putVote: RequestHandler = async (
    { body, params },
    response,
    next
): Promise<void> => {
    try {
        const { id } = params;
        const postId = await PostService.updateVote(+id, body);
        sendResponse(response, { id: postId });
    } catch (error) {
        next(error);
    }
};

export default putVote;
