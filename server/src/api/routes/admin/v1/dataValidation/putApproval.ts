import { RequestHandler } from "express";
import status from "http-status";

import { NOT_FOUND } from "#utils/const/validationErrors";
import Post from "#models/Post";
import PostError from "#utils/errors/PostError";
import UserError from "#utils/errors/UserError";
import User from "#models/User";

const putApproval: RequestHandler = async (
    { ip, params },
    response,
    next
): Promise<void> => {
    const { id } = params;

    try {
        const post = await Post.findById(+id);

        if (!post) {
            throw new PostError(NOT_FOUND, status.NOT_FOUND, ip);
        }

        const user = await User.findById(post.userId);

        if (!user) {
            throw new UserError(NOT_FOUND, status.NOT_FOUND, ip);
        }

        response.locals.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default putApproval;
