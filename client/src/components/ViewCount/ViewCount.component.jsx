import React from "react";

import CappedCount from "components/CappedCount";
import Views from "components/Icon/Views.component";
import { defaultProps, propTypes } from "./ViewCount.props";
import styles from "./ViewCount.module.scss";

ViewCount.defaultProps = defaultProps;
ViewCount.propTypes = propTypes;

function ViewCount ({ count }) {
    return (
        <div className={styles.container} title={`Просмотров: ${count}`}>
            <Views size={30} />
            <CappedCount count={count} />
        </div>
    );
}

export default ViewCount;
