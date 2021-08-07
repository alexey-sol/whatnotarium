import React from "react";

import { defaultProps, propTypes } from "./SearchPrompt.props";
import styles from "./SearchPrompt.module.scss";

SearchPrompt.defaultProps = defaultProps;
SearchPrompt.propTypes = propTypes;

function SearchPrompt ({ onClick, title }) {
    return (
        <div
            onClick={onClick}
            className={styles.container}
            title={title}
        >
            <div className={styles.enter} />
        </div>
    );
}

export default SearchPrompt;
