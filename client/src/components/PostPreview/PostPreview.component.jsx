import { Link } from "react-router-dom";
import React from "react";

import { POST, USER } from "utils/const/pathnames";
import { UserPicturePlaceholder } from "components/Icon";
import DateFormatter from "utils/formatters/DateFormatter";
import { propTypes } from "./PostPreview.props";
import styles from "./PostPreview.module.scss";
import toBase64 from "utils/helpers/toBase64";

PostPreview.propTypes = propTypes;

function PostPreview ({
    author,
    body,
    createdAt,
    id,
    title,
    updatedAt
}) {
    const { name, picture } = author;

    const formattedCreatedAt = new DateFormatter(createdAt)
        .formatByPattern("YYYY, MMM DD");

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
                <Link
                    className={styles.content}
                    title="Развернуть статью"
                    to={`/${POST}/${id}`}
                >
                    {title}
                </Link>
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
                        {author.name}
                    </span>
                </Link>

                <span className={styles.date}>
                    {formattedCreatedAt}
                </span>
            </section>
        </article>
    );
}

export default PostPreview;
