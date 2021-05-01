import { RequestHandler } from "express";

import PostService from "#services/PostService/v1";

const putPost: RequestHandler = async (
    { body, params },
    response,
    next
): Promise<void> => {
    try {
        const { id } = params;
        response.locals.data = await PostService.updatePost(+id, body);
        next();
    } catch (error) {
        next(error);
    }
};

export default putPost;
