import { RequestHandler } from "express";

import { SEND_POST_APPROVED, SEND_POST_REJECTED } from "#utils/const/events/user";
import PostService from "#services/PostService/v1";
import User from "#models/User";
import sendResponse from "#utils/http/sendResponse";
import userEmitter from "#events/user";

const putApproval: RequestHandler = async (
    { body, params },
    response,
    next
): Promise<void> => {
    const { id } = params;
    const { isApproved, message } = body;
    const { email } = response.locals.user as User;

    try {
        const post = await PostService.updatePost(+id, { isApproved });

        if (isApproved) {
            userEmitter.emit(SEND_POST_APPROVED, {
                email,
                postId: id,
                postTitle: post.title
            });
        } else {
            userEmitter.emit(SEND_POST_REJECTED, {
                email,
                message,
                postId: id,
                postTitle: post.title
            });
        }

        sendResponse(response, post);
    } catch (error) {
        next(error);
    }
};

export default putApproval;
