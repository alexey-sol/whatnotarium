import { instanceOf, object, string } from "prop-types";

export const propTypes = {
    author: object.isRequired,
    content: string.isRequired,
    createdAt: instanceOf(Date).isRequired,
    title: string.isRequired,
    updatedAt: instanceOf(Date).isRequired
};
