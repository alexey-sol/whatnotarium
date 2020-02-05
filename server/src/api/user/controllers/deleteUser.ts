import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";
import User from "api/user/model";

const deleteUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { id } = request.params;

    try {
        await User.destroyById(id);
        response.status(200).send({ id });
    } catch (error) {
        // return next(error);
    }
};

export default deleteUser;
