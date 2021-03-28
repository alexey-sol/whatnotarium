import { CREATED } from "http-status";
import { RequestHandler } from "express";

import { SEND_POST_WAITING_APPROVAL } from "#utils/const/events/user";
import PostService from "#services/PostService/v1";
import RequestSession from "#utils/helpers/RequestSession";
import sendResponse from "#utils/http/sendResponse";
import userEmitter from "#events/user";

const postPost: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const session = new RequestSession(request);
    const sessionUser = session.getUserFromSession();

    try {
        const post = await PostService.createPost(request.body);
        const { id, title } = post;

        if (sessionUser?.email) {
            userEmitter.emit(SEND_POST_WAITING_APPROVAL, {
                email: sessionUser?.email,
                postId: id,
                postTitle: title
            });
        }

        sendResponse(response, post, CREATED);
    } catch (error) {
        next(error);
    }
};

export default postPost;
