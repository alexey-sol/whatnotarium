import { Request, Response, NextFunction } from "express";

type ApiController = (
    request: Request,
    response: Response,
    next: NextFunction
) => void | never;

export default ApiController;
