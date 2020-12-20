import { Link } from "react-router-dom";
import React from "react";

import { USER } from "utils/const/pathnames";
import { UserPicturePlaceholder } from "components/Icon";
import BaseButton from "components/BaseButton";
import PostRating from "components/PostRating";
import { defaultProps, propTypes } from "./PostDetails.component.props";
import styles from "./PostDetails.module.scss";
import toBase64 from "utils/helpers/toBase64";

PostDetails.defaultProps = defaultProps;
PostDetails.propTypes = propTypes;

function PostDetails ({
    currentUserId,
    handleClickOnEditButton,
    post
}) {
    const {
        author = {},
        body,
        id,
        title,
        updatedAt,
        userId
    } = post;

    const { name, picture } = author;
    const isAuthor = userId === currentUserId;
    const shouldRenderControls = Boolean(isAuthor && id);

    const bodyHTML = { __html: body };

    const picDataIfAny = (picture)
        ? `data:image/jpeg;base64,${toBase64(picture.data)}`
        : null;

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
                <Link title={name} to={`/${USER}/${id}`}>
                    <div className={styles.userPicture}>
                        {(picture)
                            ? <img alt={name} src={picDataIfAny} />
                            : <UserPicturePlaceholder fill="#455a64" size={50} />}
                    </div>
                </Link>

                <Link title={name} to={`/${USER}/${id}`}>
                    <span>
                        {author?.name}
                    </span>
                </Link>

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

            <section className={styles.stats}>
                <PostRating
                    isDisabled={!currentUserId || isAuthor}
                    post={post}
                />

                <div className={styles.viewCount} />
            </section>
        </article>
    );
}

export default PostDetails;
