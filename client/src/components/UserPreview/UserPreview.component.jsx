import { Link } from "react-router-dom";
import React from "react";

import { USER } from "utils/const/pathnames";
import { UserPicturePlaceholder } from "components/Icon";
import DateFormatter from "utils/formatters/DateFormatter";
import { propTypes } from "./UserPreview.props";
import styles from "./UserPreview.module.scss";
import toBase64 from "utils/helpers/toBase64";

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
            <div className={styles.userPicture}>
                <Link title={name} to={`/${USER}/${id}`}>
                    {(picture)
                        ? userPicElem
                        : userPicPlaceholderElem}
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
