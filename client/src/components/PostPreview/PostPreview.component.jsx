import { Link } from "react-router-dom";
import React from "react";

import { AvatarPlaceholder } from "components/Icon";
import { POST } from "utils/const/pathnames";
import DateFormatter from "utils/formatters/DateFormatter";
import { propTypes } from "./PostPreview.props";
import styles from "./PostPreview.module.scss";

PostPreview.propTypes = propTypes;

function PostPreview ({
    author,
    body,
    createdAt,
    id,
    title,
    updatedAt
}) {
    const formattedUpdatedAt = new DateFormatter(updatedAt)
        .formatByPattern("YYYY, MMM DD");

    const bodyHTML = { __html: body };

    const avatarImgElem = (
        <img
            alt={author.name}
            src={author.avatarUrl}
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
            <Link
                className={styles.content}
                title="Развернуть статью"
                to={`${POST}/${id}`}
            >
                <header className={styles.title}>
                    {title}
                </header>

                <section
                    className={styles.body}
                    dangerouslySetInnerHTML={bodyHTML}
                />
            </Link>

            <section className={styles.metadata}>
                <div className={styles.avatar}>
                    {(author.avatarUrl)
                        ? avatarImgElem
                        : avatarPlaceholderElem}
                </div>

                <span>
                    {author.name}
                </span>

                <span className={styles.date}>
                    {formattedUpdatedAt}
                </span>
            </section>
        </article>
    );
}

export default PostPreview;
