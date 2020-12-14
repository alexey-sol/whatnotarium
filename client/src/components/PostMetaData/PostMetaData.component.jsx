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
import { voteForPostStart } from "redux/posts/posts.actions";
import { selectCurrentUser } from "redux/session/session.selectors";
import styles from "./PostMetaData.module.scss";
import toBase64 from "utils/helpers/toBase64";

PostMetaData.defaultProps = defaultProps;
PostMetaData.propTypes = propTypes;

function PostMetaData ({
    currentUser,
    isPreview,
    onVoteForPostStart,
    post
}) {
    const {
        author,
        createdAt,
        id,
        rating,
        updatedAt,
        userId,
        userIdsVotedDown,
        userIdsVotedUp
    } = post;
    const { name, picture } = author;
    const isAuthor = currentUser?.id === userId;

    const votedUp = userIdsVotedUp.includes(currentUser?.id);
    const votedDown = userIdsVotedDown.includes(currentUser?.id);

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

    const likePost = () => onVoteForPostStart({
        postId: id,
        userId: currentUser?.id,
        value: (votedUp) ? 0 : 1
    });

    const dislikePost = () => onVoteForPostStart({
        postId: id,
        userId: currentUser?.id,
        value: (votedDown) ? 0 : -1
    });

    const renderStats = () => (
        <section className={styles.stats}>
            <div className={styles.votes} />

            <div className={styles.viewCount} />
        </section>
    );

    const renderControls = () => (
        <section>
            <button
                className={(votedUp) ? styles.active : ""}
                onClick={likePost}
            >
                Нравится
            </button>

            <button
                className={(votedDown) ? styles.active : ""}
                onClick={dislikePost}
            >
                Не нравится
            </button>
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
                    <span>{author.name}</span>
                </Link>

                <span className={styles.date}>{formattedCreatedAt}</span>
            </section>

            {(shouldShowControls)
                ? renderControls()
                : renderStats()}

            Оценка:
            {" "}
            {rating}
        </section>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
    onVoteForPostStart: (props) => dispatch(voteForPostStart(props))
});

const ConnectedCustomLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostMetaData);

export default ConnectedCustomLink;
