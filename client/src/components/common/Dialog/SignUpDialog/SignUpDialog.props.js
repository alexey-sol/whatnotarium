import PropTypes from "prop-types";

import { propTypes as dialogPropTypes } from "../Dialog.props";

const { func } = PropTypes;

export const propTypes = {
    ...dialogPropTypes,
    signUpStart: func
};
