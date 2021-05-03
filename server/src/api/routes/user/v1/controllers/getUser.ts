import { RequestHandler } from "express";

const getUser: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    response.locals.data = response.locals.user;
    next();
};

export default getUser;
