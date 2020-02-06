import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";
import User from "api/user/user.model";

const getUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { id } = request.params;

    try {
        const user = await User.findById(id);
        response.status(200).send(user);
    } catch (error) {
        // return next(error);
    }
};

export default getUser;
