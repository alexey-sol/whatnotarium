import { number, object } from "prop-types";

export const defaultProps = {
    userId: null
};

export const propTypes = {
    match: object.isRequired,
    userId: number
};
