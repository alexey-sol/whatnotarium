import { Link } from "react-router-dom";
import React from "react";

import { USER } from "utils/const/pathnames";
import DateFormatter from "utils/formatters/DateFormatter";
import UserPicture from "components/ui/UserPicture";
import { propTypes } from "./UserPreview.props";
import styles from "./UserPreview.module.scss";

UserPreview.propTypes = propTypes;

function UserPreview ({ createdAt, id, profile }) {
    const { name, picture } = profile;
    const formattedCreatedAt = new DateFormatter(createdAt).formatByPattern();

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

            <section className={styles.nameAndDate}>
                <header className={styles.userName}>
                    <Link title={name} to={`/${USER}/${id}`}>
                        {name}
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
