import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";

const getUser: ApiController = function (
    request: Request,
    response: Response,
    next: NextFunction
): void | never {
    const { id } = request.params;
    console.log("getUser");
};

export default getUser;
