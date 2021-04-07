import { RequestHandler } from "express";

const getPost: RequestHandler = async (
    { params },
    response,
    next
): Promise<void> => {
    const { post } = response.locals;

    try {
        response.locals.data = post;
        next();
    } catch (error) {
        next(error);
    }
};

export default getPost;
