import React from "react";

import DraftEditor from "components/DraftEditor";
import styles from "./Draft.module.scss";

function Draft () {
    return (
        <article className={styles.container}>
            <DraftEditor />
        </article>
    );
}

export default Draft;
