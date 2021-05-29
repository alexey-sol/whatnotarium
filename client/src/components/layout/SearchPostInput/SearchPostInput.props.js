import {
    bool,
    func,
    object,
    string
} from "prop-types";

export const defaultProps = {
    hasManualEnter: false,
    rootClassName: ""
};

export const propTypes = {
    hasManualEnter: bool,
    history: object,
    location: object,
    onClose: func.isRequired,
    onSearchPostsStart: func.isRequired,
    onSetCurrentPage: func.isRequired,
    rootClassName: string
};
