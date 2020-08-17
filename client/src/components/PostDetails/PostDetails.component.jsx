import React from "react";

import { AvatarPlaceholder } from "components/Icon";
import BaseButton from "components/BaseButton";
import { defaultProps, propTypes } from "./PostDetails.component.props";
import styles from "./PostDetails.module.scss";

PostDetails.defaultProps = defaultProps;
PostDetails.propTypes = propTypes;

function PostDetails ({
    handleClickOnEditButton,
    post,
    userId
}) {
    const {
        author,
        body,
        id,
        title,
        updatedAt
    } = post || {};

    const userIsAuthor = post?.userId === userId;
    const shouldRenderControls = Boolean(userIsAuthor && id);

    const bodyHTML = { __html: body };

    const avatarImgElem = (
        <img
            alt={author?.name}
            src={author?.avatarUrl}
        />
    );

    const avatarPlaceholderElem = (
        <AvatarPlaceholder
            fill="#455a64"
            size={50}
        />
    );

    return (
        <article className={styles.container}>
            <header className={styles.title}>
                {title}
            </header>

            <section
                className={styles.body}
                dangerouslySetInnerHTML={bodyHTML}
            />

            <section className={styles.metadata}>
                <div className={styles.avatar}>
                    {(author?.avatarUrl)
                        ? avatarImgElem
                        : avatarPlaceholderElem}
                </div>

                <span>
                    {author?.name}
                </span>

                <span className={styles.date}>
                    {updatedAt}
                </span>
            </section>

            {shouldRenderControls && (
                <section className={styles.controls}>
                    <BaseButton
                        onClick={handleClickOnEditButton}
                        text="Редактировать"
                    />
                </section>
            )}
        </article>
    );
}

export default PostDetails;
