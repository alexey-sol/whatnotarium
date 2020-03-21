import PropTypes from "prop-types";

import { propTypes as iconButtonPropTypes } from "../IconButton.props";

const { object } = PropTypes;

export const defaultProps = {
    currentUser: null
};

export const propTypes = {
    ...iconButtonPropTypes,
    currentUser: object,
    location: object.isRequired
};
