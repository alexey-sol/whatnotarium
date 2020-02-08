import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";
import User from "api/user/user.model";
import sendResponse from "utils/sendResponse";

const deleteUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { id } = request.params;

    User.destroyById(id)
        .then(() => sendResponse(response, true))
        .catch(next);
};

export default deleteUser;
