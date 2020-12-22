import { Link } from "react-router-dom";
import React from "react";

import { USER } from "utils/const/pathnames";
import { UserPicturePlaceholder } from "components/Icon";
import DateFormatter from "utils/formatters/DateFormatter";
import PostRating from "components/PostRating";
import { propTypes } from "./PostMetaData.props";
import styles from "./PostMetaData.module.scss";
import toBase64 from "utils/helpers/toBase64";

PostMetaData.propTypes = propTypes;

function PostMetaData ({ post }) {
    const {
        author,
        createdAt,
        id,
        viewCount
    } = post;

    const { name, picture } = author;

    const formattedCreatedAt = new DateFormatter(createdAt)
        .formatByPattern("YYYY, MMM DD");

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
        <section className={styles.container}>
            <section className={styles.userProfile}>
                <Link title={name} to={`/${USER}/${id}`}>
                    <div className={styles.picture}>
                        {(picture)
                            ? userPicElem
                            : userPicPlaceholderElem}
                    </div>
                </Link>

                <Link title={name} to={`/${USER}/${id}`}>
                    <span>{author.name}</span>
                </Link>

                <span className={styles.date}>{formattedCreatedAt}</span>
            </section>

            <section className={styles.stats}>
                <PostRating
                    post={post}
                    withoutControls
                />

                <div className={styles.viewCount}>
                    {viewCount}
                </div>
            </section>
        </section>
    );
}

export default PostMetaData;
