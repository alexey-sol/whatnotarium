import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";
import User from "api/user/user.model";
import sendResponse from "utils/sendResponse";

const getUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { id } = request.params;

    User.findById(id)
        .then(user => sendResponse(response, user))
        .catch(next);
};

export default getUser;
