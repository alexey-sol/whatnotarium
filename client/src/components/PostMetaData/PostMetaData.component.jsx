import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    DislikeActiveIconButton, DislikeIconButton, LikeActiveIconButton, LikeIconButton
} from "components/IconButton";
import { Like, UserPicturePlaceholder, Views } from "components/Icon";
import { USER } from "utils/const/pathnames";
import DateFormatter from "utils/formatters/DateFormatter";
import { defaultProps, propTypes } from "./PostMetaData.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import styles from "./PostMetaData.module.scss";
import toBase64 from "utils/helpers/toBase64";

CustomLink.defaultProps = defaultProps;
CustomLink.propTypes = propTypes;

function CustomLink ({
    currentUser,
    isPreview,
    post,
    userProfile
}) {
    const {
        createdAt,
        id,
        likes,
        postLikes,
        updatedAt,
        userId
    } = post;

    const { name, picture } = userProfile;
    const isAuthor = currentUser?.id === userId;

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

    const renderStats = () => (
        <section className={styles.stats}>
            <div className={styles.likeCount}>
                
            </div>

            <div className={styles.viewCount}>

            </div>
        </section>
    );

    const renderControls = () => (
        <section>
            <button>Like +</button>
            <button>Dislike -</button>

            Like count: {likes.reduce((acc, like) => {
                return acc + like.count;
            }, 0)}
        </section>
    );

    const shouldShowControls = Boolean(currentUser) && !isAuthor;

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
                    <span>{userProfile.name}</span>
                </Link>

                <span className={styles.date}>{formattedCreatedAt}</span>
            </section>

            {(shouldShowControls)
                ? renderControls()
                : renderStats()}
        </section>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const ConnectedCustomLink = connect(
    mapStateToProps
)(CustomLink);

export default ConnectedCustomLink;
