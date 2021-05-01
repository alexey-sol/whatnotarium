import { RequestHandler } from "express";

const getPost: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    response.locals.data = response.locals.post;
    next();
};

export default getPost;
