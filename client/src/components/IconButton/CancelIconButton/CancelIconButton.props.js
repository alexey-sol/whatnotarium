import { string } from "prop-types";

import {
    defaultProps as iconButtonDefaultProps,
    propTypes as iconButtonPropTypes
} from "../IconButton.props";

export const defaultProps = {
    ...iconButtonDefaultProps,
    title: "Закрыть"
};

export const propTypes = {
    ...iconButtonPropTypes,
    title: string
};
