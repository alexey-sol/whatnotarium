import { number, object } from "prop-types";

export const propTypes = {
    post: object.isRequired,
    userId: number.isRequired
};
