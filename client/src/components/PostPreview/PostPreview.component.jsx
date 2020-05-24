import React from "react";

import { propTypes } from "./PostPreview.props";
import DateFormatter from "utils/formatters/DateFormatter";
import styles from "./PostPreview.module.scss";

PostPreview.propTypes = propTypes;

function PostPreview ({
    author,
    content,
    createdAt,
    title,
    updatedAt
}) {
    const formattedUpdatedAt = new DateFormatter(updatedAt)
        .formatByPattern("YYYY, MMM DD");

    return (
        <article className={styles.container}>
            <header className={styles.title}>
                {title}
            </header>

            <section className={styles.content}>
                {content}
            </section>

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
