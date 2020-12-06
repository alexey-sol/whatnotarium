import React from "react";

import { UserPicturePlaceholder } from "components/Icon";
import BaseButton from "components/BaseButton";
import { defaultProps, propTypes } from "./PostDetails.component.props";
import styles from "./PostDetails.module.scss";
import toBase64 from "../../utils/helpers/toBase64";
import { USER } from "../../utils/const/pathnames";
import { Link } from "react-router-dom";

PostDetails.defaultProps = defaultProps;
PostDetails.propTypes = propTypes;

function PostDetails ({
    handleClickOnEditButton,
    post,
    userId
}) {
    const {
        author = {},
        body,
        id,
        postLikes,
        title,
        updatedAt
    } = post || {};

    const { name, picture } = author;
    const userIsAuthor = post?.userId === userId;
    const shouldRenderControls = Boolean(userIsAuthor && id);

    const bodyHTML = { __html: body };

    const picDataIfAny = (picture)
        ? `data:image/jpeg;base64,${toBase64(picture.data)}`
        : null;

    const userPicElem = (
        <img
            alt={name}
            src={picDataIfAny}
        />
    );

    const userPicPlaceholderElem = (
        <UserPicturePlaceholder
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
                <Link title={name} to={`/${USER}/${id}`}>
                    <div className={styles.userPicture}>
                        {(picture)
                            ? userPicElem
                            : userPicPlaceholderElem}
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
        </article>
    );
}

export default PostDetails;
