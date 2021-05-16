import { RequestHandler } from "express";

const postPost: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    try {
        next();
    } catch (error) {
        next(error);
    }
};

export default postPost;
