import { Link } from "react-router-dom";
import React from "react";

import { POST } from "utils/const/pathnames";
import PostMetaData from "components/PostMetaData";
import { propTypes } from "./PostPreview.props";
import styles from "./PostPreview.module.scss";

PostPreview.propTypes = propTypes;

function PostPreview ({ post }) {
    const {
        body,
        id,
        title
    } = post;

    const bodyHTML = { __html: body };

    return (
        <article className={styles.container}>
            <header className={styles.title}>
                <Link
                    className={styles.content}
                    title="Развернуть статью"
                    to={`/${POST}/${id}`}
                >
                    {title}
                </Link>
            </header>

            <section
                className={styles.body}
                dangerouslySetInnerHTML={bodyHTML}
            />

            <PostMetaData
                post={post}
            />
        </article>
    );
}

export default PostPreview;
