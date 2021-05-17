import React, {Fragment} from "react";

import { Link } from "react-router-dom";
import { USER } from "utils/const/pathnames";
import DateFormatter from "utils/formatters/DateFormatter";
import UserPicture from "components/UserPicture";
import { propTypes } from "./PostAuthorInfo.props";
import styles from "./PostAuthorInfo.module.scss";

PostAuthorInfo.propTypes = propTypes;

function PostAuthorInfo ({ createdAt, updatedAt, user }) {
    const { id, name, picture } = user;
    const formattedCreatedAt = createdAt && new DateFormatter(createdAt).formatByPattern();
    const formattedUpdatedAt = updatedAt && new DateFormatter(updatedAt).formatByPattern();
    const edited = createdAt !== updatedAt;

    const concisePostInfo = (
        <Fragment>{formattedCreatedAt}</Fragment>
    );

    const detailedPostInfo = (
        <Fragment>
            Создано {formattedCreatedAt}
            {edited && <Fragment>&nbsp;(отредактировано {formattedUpdatedAt})</Fragment>}
        </Fragment>
    );

    return (
        <div className={styles.container}>
            <div className={styles.picture}>
                <Link title={name} to={`/${USER}/${id}`}>
                    <UserPicture
                        name={name}
                        picture={picture}
                        rootClassName={styles.picture}
                    />
                </Link>
            </div>

            <div className={styles.info}>
                <Link title={name} to={`/${USER}/${id}`}>
                    <span>{name}</span>
                </Link>

                <span className={styles.date}>
                    {(updatedAt)
                        ? detailedPostInfo
                        : concisePostInfo}
                </span>
            </div>
        </div>
    );
}

export default PostAuthorInfo;
