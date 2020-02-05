import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";
import User from "api/user/model";

const getUsers: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        const users = await User.find();
        response.status(200).send(users);
    } catch (error) {
        // return next(error);
    }
};

export default getUsers;
