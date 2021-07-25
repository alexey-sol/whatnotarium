import { bool, func, object } from "prop-types";

export const defaultProps = {
    currentPost: {},
    currentUser: null,
    post: null
};

export const propTypes = {
    currentUser: object,
    history: object.isRequired,
    isPending: bool,
    match: object.isRequired,
    onCreatePostStart: func.isRequired,
    onDeletePostStart: func.isRequired,
    onFetchPostStart: func.isRequired,
    onHideLoader: func.isRequired,
    onShowLoader: func.isRequired,
    onShowNotification: func.isRequired,
    onUpdatePostStart: func.isRequired,
    post: object
};
