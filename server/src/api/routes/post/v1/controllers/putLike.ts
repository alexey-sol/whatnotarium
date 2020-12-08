import { RequestHandler } from "express";

import PostService from "#services/PostService/v1";
import sendResponse from "#utils/http/sendResponse";

const putLike: RequestHandler = async (
    { body, params },
    response,
    next
): Promise<void> => {
    try {
        const { id } = params;
        const postId = await PostService.updateLike(+id, body);
        sendResponse(response, { id: postId });
    } catch (error) {
        next(error);
    }
};

export default putLike;
