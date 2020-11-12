import { func, object, string } from "prop-types";

export const defaultProps = {
    rootClassName: ""
};

export const propTypes = {
    history: object,
    location: object,
    onClose: func.isRequired,
    onSearchPostsStart: func.isRequired,
    rootClassName: string
};
