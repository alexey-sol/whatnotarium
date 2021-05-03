import { RequestHandler } from "express";

import UserService from "#services/UserService/v1";

const deleteUser: RequestHandler = async (
    { params },
    response,
    next
): Promise<void> => {
    try {
        const { id } = params;
        response.locals.data = await UserService.deleteUser(+id);
        next();
    } catch (error) {
        next(error);
    }
};

export default deleteUser;
