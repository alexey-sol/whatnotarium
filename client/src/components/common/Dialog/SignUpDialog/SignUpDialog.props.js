import PropTypes from "prop-types";

import { propTypes as dialogPropsTypes } from "../Dialog.props";

const { func } = PropTypes;

export const propTypes = {
    ...dialogPropsTypes,
    signUpStart: func
};
