import React from "react";

import PostAuthorInfo from "components/PostAuthorInfo";
import PostRating from "components/PostRating";
import ViewCount from "components/ViewCount";
import { propTypes } from "./PostMetaData.props";
import styles from "./PostMetaData.module.scss";

PostMetaData.propTypes = propTypes;

function PostMetaData ({ post }) {
    const { author, createdAt, viewCount } = post;

    return (
        <section className={styles.container}>
            <PostAuthorInfo createdAt={createdAt} user={author} />

            <section className={styles.stats}>
                <PostRating
                    post={post}
                    withoutControls
                />

                <ViewCount count={viewCount} />
            </section>
        </section>
    );
}

export default PostMetaData;
