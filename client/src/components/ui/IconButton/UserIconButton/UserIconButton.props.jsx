import { object } from "prop-types";

import {
    defaultProps as iconButtonDefaultProps,
    propTypes as iconButtonPropTypes
} from "../IconButton.props";

export const defaultProps = {
    ...iconButtonDefaultProps,
    currentUser: null
};

export const propTypes = {
    ...iconButtonPropTypes,
    currentUser: object,
    location: object.isRequired
};
