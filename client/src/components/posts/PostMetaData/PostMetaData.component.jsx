import React from "react";

import PostAuthorInfo from "components/posts/PostAuthorInfo";
import PostRating from "components/posts/PostRating";
import ViewCount from "components/posts/ViewCount";
import { propTypes } from "./PostMetaData.props";
import styles from "./PostMetaData.module.scss";

PostMetaData.propTypes = propTypes;

function PostMetaData ({ post, userId }) {
    const { author, createdAt, viewCount } = post;

    return (
        <section className={styles.container}>
            <PostAuthorInfo
                createdAt={createdAt}
                user={author}
                userId={userId}
            />

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
