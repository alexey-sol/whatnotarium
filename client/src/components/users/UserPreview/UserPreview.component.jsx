import { Link } from "react-router-dom";
import React from "react";
import classnames from "classnames";

import { USER } from "utils/const/pathnames";
import DateFormatter from "utils/formatters/DateFormatter";
import UserPicture from "components/ui/UserPicture";
import { propTypes } from "./UserPreview.props";
import styles from "./UserPreview.module.scss";

UserPreview.propTypes = propTypes;

function UserPreview ({
    createdAt,
    id,
    isConfirmed,
    profile
}) {
    const { name, picture } = profile;
    const formattedCreatedAt = new DateFormatter(createdAt).formatByPattern();

    const containerClassName = classnames(
        styles.container,
        (isConfirmed) ? "" : styles.inactive
    );

    return (
        <article className={containerClassName}>
            <div className={styles.userPicture}>
                <Link title={name} to={`/${USER}/${id}`}>
                    <UserPicture
                        name={name}
                        picture={picture}
                    />
                </Link>
            </div>

            <section className={styles.nameAndDate}>
                <header className={styles.userName}>
                    <Link title={name} to={`/${USER}/${id}`}>
                        {name}
                        {!isConfirmed && <span>&nbsp;(email не подтвержден)</span>}
                    </Link>
                </header>

                <section className={styles.date}>
                    <span>Дата регистрации:&nbsp;</span>
                    <span className={styles.date}>{formattedCreatedAt}</span>
                </section>
            </section>

            <section className={styles.about}>
                {profile.about}
            </section>
        </article>
    );
}

export default UserPreview;
