import { func, object } from "prop-types";

export const defaultProps = {
    oauthError: null
};

export const propTypes = {
    history: object.isRequired,
    location: object.isRequired,
    match: object.isRequired,
    oauthError: object,
    onGetTokenStart: func.isRequired,
    onResetOauthError: func.isRequired,
    onShowNotification: func.isRequired
};
