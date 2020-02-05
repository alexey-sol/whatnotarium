import { Request, Response, NextFunction } from "express";

type ApiController = (
    request: Request,
    response: Response,
    next: NextFunction
) => Promise<void>;

export default ApiController;
