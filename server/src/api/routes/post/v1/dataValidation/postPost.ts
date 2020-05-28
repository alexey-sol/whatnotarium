import { CONFLICT } from "http-status";
import { RequestHandler } from "express";

import { ALREADY_EXISTS } from "#utils/const/validationErrors";
import Post from "#models/Post";
import PostError from "#utils/errors/PostError";

const postPost: RequestHandler = async (
    { body, ip },
    response,
    next
): Promise<void> => {
    try {
        // TODO

        next();
    } catch (error) {
        next(error);
    }
};

export default postPost;
