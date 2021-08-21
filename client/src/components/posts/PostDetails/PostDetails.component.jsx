import React, { useState } from "react";

import { REJECTION_REASON } from "utils/const/postData";
import BaseButton from "components/ui/BaseButton";
import PostAuthorInfo from "components/posts/PostAuthorInfo";
import PostBody from "components/posts/PostBody";
import PostRating from "components/posts/PostRating";
import Textarea from "components/forms/Textarea";
import ViewCount from "components/posts/ViewCount";
import { defaultProps, propTypes } from "./PostDetails.component.props";
import styles from "./PostDetails.module.scss";

const MIN_REJECTION_REASON_LENGTH = 5;
const MAX_REJECTION_REASON_LENGTH = 300;

PostDetails.defaultProps = defaultProps;
PostDetails.propTypes = propTypes;

function PostDetails ({
    approvePost,
    currentUser,
    handleClickOnEditButton,
    post,
    rejectPost
}) {
    const [whyFormShown, setWhyFormShown] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
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

    const isAuthor = userId === currentUserId;
    const shouldRenderControls = Boolean(isAuthor && id);

    const rejectionIsAllowed = whyFormShown && rejectionReason
        .length >= MIN_REJECTION_REASON_LENGTH;
    const rejectionButtonIsDisabled = whyFormShown && rejectionReason
        .length < MIN_REJECTION_REASON_LENGTH;

    const bodyHTML = { __html: body };

    const rejectionReasonLabel = "Пожалуйста, укажите причину отказа (не менее " +
        `${MIN_REJECTION_REASON_LENGTH} символов)`;

    const handleClickOnRejectButton = () => {
        if (!whyFormShown) {
            setWhyFormShown(true);
        }

        if (rejectionIsAllowed) {
            rejectPost(rejectionReason);
        }
    };

    return (
        <article className={styles.container}>
            <header className={styles.title}>
                {title}
            </header>

            <section className={styles.body}>
                <PostBody htmlContent={bodyHTML} />
            </section>

            <PostAuthorInfo
                createdAt={createdAt}
                updatedAt={updatedAt}
                user={author}
                userId={userId}
            />

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

            {!isAdmin && (
                <section className={styles.stats}>
                    <PostRating
                        isDisabled={!currentUserId || isAuthor}
                        post={post}
                    />

                    <ViewCount count={viewCount} />
                </section>
            )}

            {isAdmin && !isApproved && (
                <section className={styles.adminControls}>
                    <div className={styles.adminButtons}>
                        <BaseButton
                            onClick={approvePost}
                            text="Пропустить"
                        />

                        <BaseButton
                            disabled={!isFrozen || rejectionButtonIsDisabled}
                            onClick={handleClickOnRejectButton}
                            text={(rejectionIsAllowed)
                                ? "Подтвердить отказ"
                                : "Отклонить"}
                            theme="dark"
                        />
                    </div>

                    {whyFormShown && (
                        <form>
                            <Textarea
                                label={rejectionReasonLabel}
                                maxLength={`${MAX_REJECTION_REASON_LENGTH}`}
                                name={REJECTION_REASON}
                                onChange={({ target }) => setRejectionReason(target.value)}
                                rootClassName={styles.rejectionReasonTextarea}
                                value={rejectionReason}
                            />
                        </form>
                    )}
                </section>
            )}
        </article>
    );
}

export default PostDetails;
