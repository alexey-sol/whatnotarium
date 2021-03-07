import { Request, Response } from "express";

import RequestSession from "#utils/helpers/RequestSession";
import sessionConfig from "#config/session";

export default async function (
    request: Request,
    response: Response
): Promise<void> {
    const { name } = sessionConfig;
    const session = new RequestSession(request);

    if (session.isAuthed()) {
        response.clearCookie(name);
    }
}
