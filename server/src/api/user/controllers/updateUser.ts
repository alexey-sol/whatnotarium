import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";

const updateUser: ApiController = function (
    request: Request,
    response: Response,
    next: NextFunction
): void | never {
    const { id } = request.params;
    console.log("updateUser");
};

export default updateUser;
