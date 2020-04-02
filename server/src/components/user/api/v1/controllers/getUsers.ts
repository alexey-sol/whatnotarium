import { Request, Response, NextFunction } from "express";

import ApiController from "@common/types/ApiController";
import User from "@user/model";
import sendResponse from "@common/utils/helpers/sendResponse";

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
