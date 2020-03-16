import PropTypes from "prop-types";

import { propTypes as dialogPropTypes } from "../Dialog.props";

const { func, object } = PropTypes;

export const defaultProps = {
    userError: null
};

export const propTypes = {
    ...dialogPropTypes,
    resetUserError: func.isRequired,
    signUpStart: func.isRequired,
    userError: object
};
