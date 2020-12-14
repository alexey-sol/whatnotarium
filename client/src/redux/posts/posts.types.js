import {
    FAILURE_POSTFIX as FAILURE,
    POSTS_PREFIX as POSTS,
    START_POSTFIX as START,
    SUCCESS_POSTFIX as SUCCESS
} from "utils/const/actionTypeAffixes";

export const CREATE_POST_FAILURE = `${POSTS} Create Post - ${FAILURE}`;
export const CREATE_POST_SUCCESS = `${POSTS} Create Post - ${SUCCESS}`;
export const CREATE_POST_START = `${POSTS} Create Post - ${START}`;
export const DELETE_POST_FAILURE = `${POSTS} Delete Post - ${FAILURE}`;
export const DELETE_POST_START = `${POSTS} Delete Post - ${START}`;
export const DELETE_POST_SUCCESS = `${POSTS} Delete Post - ${SUCCESS}`;
export const FETCH_POST_FAILURE = `${POSTS} Fetch Post - ${FAILURE}`;
export const FETCH_POST_START = `${POSTS} Fetch Post - ${START}`;
export const FETCH_POST_SUCCESS = `${POSTS} Fetch Post - ${SUCCESS}`;
export const FETCH_POSTS_FAILURE = `${POSTS} Fetch Posts - ${FAILURE}`;
export const FETCH_POSTS_START = `${POSTS} Fetch Posts - ${START}`;
export const FETCH_POSTS_SUCCESS = `${POSTS} Fetch Posts - ${SUCCESS}`;
export const RESET_POSTS_ERROR = `${POSTS} Reset Posts Error`;
export const SEARCH_POSTS_FAILURE = `${POSTS} Search Posts - ${FAILURE}`;
export const SEARCH_POSTS_START = `${POSTS} Search Posts - ${START}`;
export const SEARCH_POSTS_SUCCESS = `${POSTS} Search Posts - ${SUCCESS}`;
export const UPDATE_POST_FAILURE = `${POSTS} Update Post - ${FAILURE}`;
export const UPDATE_POST_START = `${POSTS} Update Post - ${START}`;
export const UPDATE_POST_SUCCESS = `${POSTS} Update Post - ${SUCCESS}`;
export const VOTE_FOR_POST_FAILURE = `${POSTS} Vote For Post - ${FAILURE}`;
export const VOTE_FOR_POST_START = `${POSTS} Vote For Post - ${START}`;
export const VOTE_FOR_POST_SUCCESS = `${POSTS} Vote For Post - ${SUCCESS}`;
