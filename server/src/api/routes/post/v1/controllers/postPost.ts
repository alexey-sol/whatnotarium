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
    const { skipPremoderation, ...rest } = request.body;
    const session = new RequestSession(request);
    const sessionUser = session.getUserFromSession();

    const props = {
        ...rest,
        isApproved: Boolean(skipPremoderation)
    };

    try {
        const post = await PostService.createPost(props);
        const { id, title } = post;
        const shouldNotifyUserAboutPremod = sessionUser?.email && !skipPremoderation;

        if (shouldNotifyUserAboutPremod) {
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
