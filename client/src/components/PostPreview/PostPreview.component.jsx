import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";

import { POST } from "utils/const/pathnames";
import PostMetaData from "components/PostMetaData";
import { propTypes } from "./PostPreview.props";
import styles from "./PostPreview.module.scss";

PostPreview.propTypes = propTypes;

function PostPreview ({ currentUser, post }) {
    const bodyRef = useRef(null);
    const [contentIsHiddenPartly, setContentIsHiddenPartly] = useState(false);

    useEffect(() => {
        const bodyElem = bodyRef.current;

        if (bodyElem) {
            const { offsetHeight, scrollHeight } = bodyElem;
            setContentIsHiddenPartly(offsetHeight < scrollHeight);
        }
    }, [bodyRef]);

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

    const renderOpenPostLink = (text) => (
        <Link
            // className={styles.content}
            title="Развернуть статью"
            to={`/${POST}/${id}`}
        >
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

    return (
        <article className={containerClassName}>
            <header className={headerClassName}>
                {renderOpenPostLink(title)}
            </header>

            <section className={styles.bodyContainer}>
                <div
                    className={styles.body}
                    dangerouslySetInnerHTML={bodyHTML}
                    ref={bodyRef}
                />

                {contentIsHiddenPartly && (
                    <div className={styles.openPost}>
                        {renderOpenPostLink("…читать")}
                    </div>
                )}
            </section>

            <PostMetaData post={post} />
        </article>
    );
}

export default PostPreview;
