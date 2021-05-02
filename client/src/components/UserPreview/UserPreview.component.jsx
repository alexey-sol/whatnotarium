import { Link } from "react-router-dom";
import React from "react";

import { USER } from "utils/const/pathnames";
import DateFormatter from "utils/formatters/DateFormatter";
import UserPicture from "../UserPicture";
import { propTypes } from "./UserPreview.props";
import styles from "./UserPreview.module.scss";

UserPreview.propTypes = propTypes;

function UserPreview ({
    createdAt,
    id,
    profile,
    updatedAt
}) {
    const { name, picture } = profile;

    const formattedCreatedAt = new DateFormatter(createdAt)
        .formatByPattern("YYYY, MMM DD");

    return (
        <article className={styles.container}>
            <div className={styles.userPicture}>
                <Link title={name} to={`/${USER}/${id}`}>
                    <UserPicture
                        name={name}
                        picture={picture}
                    />
                </Link>
            </div>

            <header className={styles.userName}>
                <Link title={name} to={`/${USER}/${id}`}>
                    {name}
                </Link>
            </header>

            <section className={styles.date}>
                <span>Дата регистрации:</span>
                <span className={styles.date}>{formattedCreatedAt}</span>
            </section>

            <section className={styles.about}>
                {profile.about}
            </section>
        </article>
    );
}

export default UserPreview;
