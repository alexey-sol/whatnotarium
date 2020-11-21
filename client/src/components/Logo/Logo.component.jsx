import { Link } from "react-router-dom";
import React from "react";

import { defaultProps, propTypes } from "./Logo.props";
import styles from "./Logo.module.scss";

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
                    ? "GR"
                    : "Geek Regime"}
            </Link>
        </div>
    );
}

export default Logo;
