import { Link } from "react-router-dom";
import React from "react";

import { USER } from "utils/const/pathnames";
import DateFormatter from "utils/formatters/DateFormatter";
import PostRating from "components/PostRating";
import UserPicture from "components/UserPicture";
import { propTypes } from "./PostMetaData.props";
import styles from "./PostMetaData.module.scss";

PostMetaData.propTypes = propTypes;

function PostMetaData ({ post }) {
    const {
        author,
        createdAt,
        userId,
        viewCount
    } = post;

    const { name, picture } = author;

    const formattedCreatedAt = new DateFormatter(createdAt)
        .formatByPattern("YYYY, MMM DD");

    return (
        <section className={styles.container}>
            <section className={styles.userProfile}>
                <Link title={name} to={`/${USER}/${userId}`}>
                    <UserPicture
                        name={name}
                        picture={picture}
                        rootClassName={styles.picture}
                    />
                </Link>

                <Link title={name} to={`/${USER}/${userId}`}>
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
