import { RequestHandler } from "express";

import querySchema from "./schemas/query";

const getUsers: RequestHandler = async (
    { query },
    response,
    next
): Promise<void> => {
    const { error } = querySchema.validate(query);

    if (error) {
        return next(error);
    }

    next();
};

export default getUsers;
