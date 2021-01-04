import { RequestHandler } from "express";
import status from "http-status";

import { FORBIDDEN, NOT_FOUND } from "#utils/const/validationErrors";
import Post from "#models/Post";
import PostError from "#utils/errors/PostError";
import RequestSession from "#utils/helpers/RequestSession";
import UserError from "#utils/errors/UserError";

const deletePost: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { ip, params } = request;
    const { id } = params;

    try {
        const post = await Post.findById(+id);

        if (!post) {
            throw new PostError(NOT_FOUND, status.NOT_FOUND, ip);
        }

        const session = new RequestSession(request);

        if (!session.isPermittedUser(post.userId)) {
            throw new UserError(FORBIDDEN, status.FORBIDDEN, ip);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default deletePost;
