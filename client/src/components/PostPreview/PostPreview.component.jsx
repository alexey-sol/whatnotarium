import { Link } from "react-router-dom";
import React from "react";
import classnames from "classnames";

import { POST } from "utils/const/pathnames";
import PostMetaData from "components/PostMetaData";
import { propTypes } from "./PostPreview.props";
import styles from "./PostPreview.module.scss";

PostPreview.propTypes = propTypes;

function PostPreview ({ currentUser, post }) {
    const {
        body,
        id,
        isApproved,
        isFrozen,
        title
    } = post;

    const bodyHTML = { __html: body };
    const { isAdmin } = currentUser || {};
    const needsFix = !isAdmin && !isApproved && !isFrozen;

    const isInactive = (
        (isAdmin && !isApproved && !isFrozen) ||
        (!isAdmin && !isApproved && isFrozen)
    );

    const containerClassName = classnames(
        styles.container,
        (isInactive) ? styles.inactive : ""
    );

    const headerClassName = classnames(
        styles.title,
        (needsFix) ? styles.rejected : ""
    );

    return (
        <article className={containerClassName}>
            <header className={headerClassName}>
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
