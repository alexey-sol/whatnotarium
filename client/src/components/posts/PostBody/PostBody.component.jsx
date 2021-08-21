import React from "react";

import { defaultProps, propTypes } from "./PostBody.props";
import styles from "./PostBody.module.scss";

PostBody.defaultProps = defaultProps;
PostBody.propTypes = propTypes;

function PostBody ({ htmlContent }) {
    return (
        <section
            className={styles.container}
            dangerouslySetInnerHTML={htmlContent}
        />
    );
}

export default PostBody;
