import { Link } from "react-router-dom";
import React from "react";

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

                <section className={styles.body}>
                    {body}
                </section>
            </Link>

            <section className={styles.metadata}>
                <img
                    alt={author.name}
                    src={author.imageUrl}
                />

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
