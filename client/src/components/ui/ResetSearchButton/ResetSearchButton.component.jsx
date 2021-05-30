import { Link } from "react-router-dom";
import React from "react";

import { defaultProps, propTypes } from "./ResetSearchButton.props";
import styles from "./ResetSearchButton.module.scss";

ResetSearchButton.defaultProps = defaultProps;
ResetSearchButton.propTypes = propTypes;

function ResetSearchButton ({ onClick, title, to }) {
    return (
        <div className={styles.container}>
            <Link onClick={onClick} to={to}>
                {title}
            </Link>
        </div>
    );
}

export default ResetSearchButton;
