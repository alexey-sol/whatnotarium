import { RequestHandler } from "express";

import Attributes from "#types/post/Attributes";
import PostService from "#services/PostService/v1";
import convertPagingOptsToFilter from "#utils/helpers/convertPagingOptsToFilter";
import redisClient from "#redisClient";
import sendResponse from "#utils/http/sendResponse";

const getPosts: RequestHandler = async (
    { query },
    response,
    next
): Promise<void> => {
    const { count, page } = query;
    const filter = convertPagingOptsToFilter<Attributes>({ ...query });

    const key = redisClient.createKey("getPosts", filter);
    let posts = await redisClient.get(key);

    try {
        if (!posts) {
            posts = await PostService.findPosts(filter);
            await redisClient.setEX(key, posts);
        }

        sendResponse(response, { ...posts, count, page });
    } catch (error) {
        next(error);
    }
};

export default getPosts;
