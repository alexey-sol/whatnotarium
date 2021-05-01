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
        response.locals.data = await PostService.deletePost(+id);
        next();
    } catch (error) {
        next(error);
    }
};

export default deletePost;
