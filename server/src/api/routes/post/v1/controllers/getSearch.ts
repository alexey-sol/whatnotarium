import { RequestHandler } from "express";

import PostService from "#services/PostService/v1";
import sendResponse from "#utils/http/sendResponse";

const getPost: RequestHandler = async (
    { query },
    response,
    next
): Promise<void> => {
    const { searchTerm } = query;

    PostService.searchPosts(searchTerm as string)
        .then(posts => sendResponse(response, posts))
        .catch(next);
};

export default getPost;
