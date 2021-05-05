import { RequestHandler } from "express";

import PostService from "#services/PostService/v1";

const deletePost: RequestHandler = async (
    { params },
    response,
    next
): Promise<void> => {
    try {
        const { id } = params;
        const deletedPostId = await PostService.deletePost(+id);

        response.locals.data = (deletedPostId)
            ? String(deletedPostId)
            : deletedPostId;

        next();
    } catch (error) {
        next(error);
    }
};

export default deletePost;
