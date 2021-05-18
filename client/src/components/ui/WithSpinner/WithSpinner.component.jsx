import React from "react";

import Spinner from "components/ui/Spinner";
import { defaultProps, propTypes } from "./WithSpinner.props";

WithSpinner.defaultProps = defaultProps;
WithSpinner.propTypes = propTypes;

function WithSpinner (WrappedComponent, dataToPass) {
    const { isPending, ...rest } = dataToPass;

    return () => (isPending)
        ? <Spinner />
        : <WrappedComponent {...rest} />;
}

export default WithSpinner;
