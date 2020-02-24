import { Request, Response, NextFunction } from "express";

import { USERS } from "constants/dbTableNames";
import ApiController from "types/ApiController";
import BaseModel from "models/BaseModel";
import sendResponse from "utils/sendResponse";

const getUsers: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    BaseModel.find(USERS)
        .then(users => sendResponse(response, users))
        .catch(next);
};

export default getUsers;
