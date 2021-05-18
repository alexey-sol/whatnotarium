import { Link } from "react-router-dom";
import React from "react";

import { defaultProps, propTypes } from "./Logo.props";
import styles from "./Logo.module.scss";

const projectNameFull = process.env.REACT_APP_PROJECT_NAME_FULL;
const projectNameShort = process.env.REACT_APP_PROJECT_NAME_SHORT;

Logo.defaultProps = defaultProps;
Logo.propTypes = propTypes;

function Logo ({ isMobileView }) {
    return (
        <div className={styles.container}>
            <Link
                title="На главную"
                to="/"
            >
                {isMobileView
                    ? projectNameShort
                    : projectNameFull}
            </Link>
        </div>
    );
}

export default Logo;
