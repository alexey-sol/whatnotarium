import { bool, func, object } from "prop-types";

export const defaultProps = {
    currentPost: {},
    post: null
};

export const propTypes = {
    currentUser: object.isRequired,
    history: object.isRequired,
    isPending: bool,
    match: object.isRequired,
    onCreatePostStart: func.isRequired,
    onDeletePostStart: func.isRequired,
    onFetchPostStart: func.isRequired,
    onShowNotification: func.isRequired,
    onUpdatePostStart: func.isRequired,
    post: object
};
