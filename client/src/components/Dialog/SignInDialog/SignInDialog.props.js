import { func } from "prop-types";

import { propTypes as dialogPropTypes } from "../Dialog.props";

export const propTypes = {
    ...dialogPropTypes,
    showSignUpDialog: func.isRequired
};
