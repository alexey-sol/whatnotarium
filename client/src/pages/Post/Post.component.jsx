import React from "react";

import PostDetails from "components/posts/PostDetails";
import styles from "./Post.module.scss";

function Post () {
    return (
        <article className={styles.container}>
            <PostDetails />
        </article>
    );
}

export default Post;
