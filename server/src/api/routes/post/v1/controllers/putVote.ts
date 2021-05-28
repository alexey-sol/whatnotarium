import { RequestHandler } from "express";

import PostService from "#services/PostService/v1";

const putVote: RequestHandler = async (
    { body, params },
    response,
    next
): Promise<void> => {
    try {
        const { id } = params;
        response.locals.data = await PostService.updateVote(+id, body);
        next();
    } catch (error) {
        next(error);
    }
};

export default putVote;
