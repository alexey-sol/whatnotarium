import { RequestHandler } from "express";

import UserService from "#services/UserService/v1";

const putUserPicture: RequestHandler = async (
    { file, params },
    response,
    next
): Promise<void> => {
    try {
        const { id } = params;
        response.locals.data = UserService.updateUserPicture(+id, file);
        next();
    } catch (error) {
        next(error);
    }
};

export default putUserPicture;
