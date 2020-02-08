import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";
import User from "api/user/user.model";
import sendResponse from "utils/sendResponse";

const getUsers: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    User.find()
        .then(users => sendResponse(response, users))
        .catch(next);
};

export default getUsers;
