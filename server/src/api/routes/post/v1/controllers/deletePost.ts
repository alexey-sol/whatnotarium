import { RequestHandler } from "express";

import PostService from "#services/PostService/v1";
import sendResponse from "#utils/http/sendResponse";

const deletePost: RequestHandler = async (
    { params },
    response,
    next
): Promise<void> => {
    try {
        const { id } = params;
        const result = await PostService.deletePost(+id);
        sendResponse(response, result);
    } catch (error) {
        next(error);
    }
};

export default deletePost;