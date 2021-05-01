import { RequestHandler } from "express";

import { SEND_POST_APPROVED, SEND_POST_REJECTED } from "#utils/const/events/user";
import PostService from "#services/PostService/v1";
import User from "#models/User";
import Version from "#utils/helpers/Version";
import logger from "#logger";
import redisClient from "#redisClient";
import sendResponse from "#utils/http/sendResponse";
import userEmitter from "#events/user";

interface Props {
    isApproved: boolean;
    isFrozen: boolean;
}

const putApproval: RequestHandler = async (
    { body, params },
    response,
    next
): Promise<void> => {
    const { id } = params;
    const { isApproved, message } = body;
    const { email } = response.locals.user as User;

    try {
        const post = await PostService.updatePost(+id, { isApproved, isFrozen: false });

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

        clearCacheForPost(+id).catch(error => logger.error(error.message));
        sendResponse(response, post);
    } catch (error) {
        next(error);
    }
};

export default putApproval;

async function clearCacheForPost (postId: number) {
    const appMajorVersion = Version.getMajorVersion();
    const key = `GET /api/v${appMajorVersion}/post/${postId}`;
    await redisClient.delete(key);
}
