import { RequestHandler } from "express";
import status from "http-status";

import { NOT_FOUND } from "#utils/const/validationErrors";
import PostError from "#utils/errors/PostError";
import PostService from "#services/PostService/v1";

const getPost: RequestHandler = async (
    { ip, params },
    response,
    next
): Promise<void> => {
    const { id } = params;

    try {
        const post = await PostService.findPost(+id);

        if (!post) {
            throw new PostError(NOT_FOUND, status.NOT_FOUND, ip);
        }

        response.locals.post = post;
        next();
    } catch (error) {
        next(error);
    }
};

export default getPost;
