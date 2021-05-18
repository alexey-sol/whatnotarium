import { func } from "prop-types";

import { propTypes as dialogPropTypes } from "../Dialog.props";

export const defaultProps = {
    showForgotPass: null
};

export const propTypes = {
    ...dialogPropTypes,
    onClose: func,
    showForgotPass: func,
    showSignUp: func.isRequired
};
