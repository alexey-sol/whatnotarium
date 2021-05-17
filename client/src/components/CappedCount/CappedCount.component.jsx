import React from "react";
import classnames from "classnames";

import { CAPPED_COUNT } from "utils/const/defaultValues";
import { defaultProps, propTypes } from "./CappedCount.props";
import styles from "./CappedCount.module.scss";

CappedCount.defaultProps = defaultProps;
CappedCount.propTypes = propTypes;

function CappedCount ({ count, showDynamics }) {
    const absCount = Math.abs(count);
    const sign = (count > 0) ? "+" : "-";

    const formattedCount = (absCount > CAPPED_COUNT)
        ? `${CAPPED_COUNT}${sign}`
        : `${absCount}`;

    const renderArrow = (isPositive) => (isPositive)
        ? <span>&uarr;</span>
        : <span>&darr;</span>;

    const positiveDynamicClassName = (showDynamics && count > 0 && styles.positive) || "";
    const negativeDynamicClassName = (showDynamics && count < 0 && styles.negative) || "";

    const containerClassNames = classnames(
        styles.container,
        positiveDynamicClassName,
        negativeDynamicClassName
    );

    return (
        <div className={containerClassNames}>
            {showDynamics && count !== 0 && renderArrow(count > 0)}
            <span>{formattedCount}</span>
        </div>
    );
}

export default CappedCount;
