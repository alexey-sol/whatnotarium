import React from "react";

import { defaultProps, propTypes } from "./Posts.props";
import PostPreview from "components/PostPreview";
import styles from "./Posts.module.scss";

Posts.defaultProps = defaultProps;
Posts.propTypes = propTypes;

function Posts ({ posts }) {
    const postElems = posts.map(post => (
        <li
            className={styles.postItem}
            key={post.id}
        >
            <PostPreview {...post} />
        </li>
    ));

    return (
        <article className={styles.container}>
            <ul className={styles.postList}>
                {postElems}
            </ul>
        </article>
    );
}

export default Posts;
