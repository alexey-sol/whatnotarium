import { RequestHandler } from "express";

import UserService from "#services/UserService/v1";

const deleteUser: RequestHandler = async (
    { params },
    response,
    next
): Promise<void> => {
    try {
        const { id } = params;
        await UserService.deleteUser(+id);

        response.redirect("/api/v1/session");
    } catch (error) {
        next(error);
    }
};

export default deleteUser;
