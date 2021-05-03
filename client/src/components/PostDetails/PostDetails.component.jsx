import { Link } from "react-router-dom";
import React, { Fragment } from "react";

import { USER } from "utils/const/pathnames";
import BaseButton from "components/BaseButton";
import PostRating from "components/PostRating";
import UserPicture from "components/UserPicture";
import { defaultProps, propTypes } from "./PostDetails.component.props";
import styles from "./PostDetails.module.scss";
import DateFormatter from "utils/formatters/DateFormatter";

PostDetails.defaultProps = defaultProps;
PostDetails.propTypes = propTypes;

function PostDetails ({
    currentUser,
    handleClickOnApproveButton,
    handleClickOnEditButton,
    handleClickOnRejectButton,
    post
}) {
    const { id: currentUserId, isAdmin } = currentUser || {};

    const {
        author = {},
        body,
        createdAt,
        id,
        isApproved,
        isFrozen,
        title,
        updatedAt,
        userId,
        viewCount
    } = post;

    const { name, picture } = author;
    const isAuthor = userId === currentUserId;
    const shouldRenderControls = Boolean(isAuthor && id);
    const edited = createdAt !== updatedAt;

    const bodyHTML = { __html: body };
    const formattedCreatedAt = new DateFormatter(createdAt).formatByPattern();
    const formattedUpdatedAt = new DateFormatter(updatedAt).formatByPattern();

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
                <Link title={name} to={`/${USER}/${userId}`}>
                    <UserPicture
                        name={name}
                        picture={picture}
                        rootClassName={styles.userPicture}
                    />
                </Link>

                <Link title={name} to={`/${USER}/${userId}`}>
                    <span>
                        {author?.name}
                    </span>
                </Link>

                <span className={styles.date}>
                    Создано {formattedCreatedAt}
                    {edited && <Fragment>&nbsp;(отредактировано {formattedUpdatedAt})</Fragment>}
                </span>
            </section>

            {!isAdmin && isFrozen && (
                <section className={styles.warning}>
                    Статья на проверке: другие посетители пока не могут ее видеть, а также
                    она недоступна для редактирования.
                </section>
            )}

            {shouldRenderControls && (
                <section className={styles.controls}>
                    <BaseButton
                        disabled={isFrozen}
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

                <div className={styles.viewCount}>
                    {viewCount}
                </div>
            </section>

            {isAdmin && !isApproved && (
                <section className={styles.adminControls}>
                    <BaseButton
                        onClick={handleClickOnApproveButton}
                        text="Пропустить"
                    />

                    <BaseButton
                        disabled={!isFrozen}
                        onClick={handleClickOnRejectButton}
                        text="Отклонить"
                        theme="dark"
                        title={(isFrozen) ? "Статья уже отклонена" : ""}
                    />
                </section>
            )}
        </article>
    );
}

export default PostDetails;
