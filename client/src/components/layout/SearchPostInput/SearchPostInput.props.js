import {
    bool,
    func,
    object,
    string
} from "prop-types";

export const defaultProps = {
    isCompactView: false,
    rootClassName: ""
};

export const propTypes = {
    history: object,
    isCompactView: bool,
    location: object,
    onClose: func.isRequired,
    onSearchPostsStart: func.isRequired,
    onSetCurrentPage: func.isRequired,
    rootClassName: string
};
