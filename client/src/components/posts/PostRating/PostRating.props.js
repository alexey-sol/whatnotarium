import { bool, func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    isDisabled: false,
    isPending: false,
    onVoteForPostStart: null,
    post: {},
    withoutControls: false
};

export const propTypes = {
    currentUser: object,
    isDisabled: bool,
    isPending: bool,
    onVoteForPostStart: func,
    post: object,
    withoutControls: bool
};
