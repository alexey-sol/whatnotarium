import { Link } from "react-router-dom";
import React from "react";
import classnames from "classnames";

import { POST } from "utils/const/pathnames";
import PostBody from "components/posts/PostBody";
import PostMetaData from "components/posts/PostMetaData";
import { propTypes } from "./PostPreview.props";
import styles from "./PostPreview.module.scss";

PostPreview.propTypes = propTypes;

function PostPreview ({ currentUser, post }) {
    const {
        body,
        excerpt,
        id,
        isApproved,
        isFrozen,
        title,
        userId
    } = post;

    const { isAdmin } = currentUser || {};
    const needsFix = !isAdmin && !isApproved && !isFrozen;

    const isInactive = (
        (isAdmin && !isApproved && !isFrozen) ||
        (!isAdmin && !isApproved && isFrozen)
    );

    const renderOpenPostLink = (text) => (
        <Link title={`Развернуть статью "${title}"`} to={`/${POST}/${id}`}>
            {text}
        </Link>
    );

    const containerClassName = classnames(
        styles.container,
        (isInactive) ? styles.inactive : ""
    );

    const headerClassName = classnames(
        styles.title,
        (needsFix) ? styles.rejected : ""
    );

    const hasMoreContent = excerpt?.length < body?.length;

    return (
        <article className={containerClassName}>
            <header className={headerClassName}>
                {renderOpenPostLink(title)}
            </header>

            <section className={styles.bodyContainer}>
                <section className={styles.body}>
                    <PostBody htmlContent={excerpt} />
                </section>

                {hasMoreContent && (
                    <div className={styles.openPost}>
                        {renderOpenPostLink("…развернуть")}
                    </div>
                )}
            </section>

            <PostMetaData post={post} userId={userId} />
        </article>
    );
}

export default PostPreview;
