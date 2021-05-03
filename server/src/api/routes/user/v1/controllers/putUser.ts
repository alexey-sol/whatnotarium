import { RequestHandler } from "express";

import UserService from "#services/UserService/v1";

const putUser: RequestHandler = async (
    { body, params },
    response,
    next
): Promise<void> => {
    try {
        const { id } = params;
        response.locals.data = await UserService.updateUser(+id, body);
        next();
    } catch (error) {
        next(error);
    }
};

export default putUser;
