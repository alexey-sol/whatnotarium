import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";

const updateUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { id } = request.params;
    console.log("updateUser");
};

export default updateUser;
