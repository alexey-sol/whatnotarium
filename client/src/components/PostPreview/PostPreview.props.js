import {
    number,
    object,
    string
} from "prop-types";

export const propTypes = {
    author: object.isRequired,
    body: string.isRequired,
    createdAt: string.isRequired,
    id: number.isRequired,
    likeCount: number.isRequired,
    title: string.isRequired,
    updatedAt: string.isRequired
};
