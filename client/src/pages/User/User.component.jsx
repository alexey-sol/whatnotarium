import React from "react";

import UserDetails from "components/UserDetails";
import styles from "./User.module.scss";

function Post () {
    return (
        <article className={styles.container}>
            <UserDetails />
        </article>
    );
}

export default Post;
