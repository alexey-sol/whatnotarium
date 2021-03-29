import { RequestHandler } from "express";

import PostService from "#services/PostService/v1";

const getPost: RequestHandler = async (
    { params },
    response,
    next
): Promise<void> => {
    const { id } = params;

    try {
        response.locals.data = await PostService.findPost(+id);
        next();
    } catch (error) {
        next(error);
    }
};

export default getPost;
