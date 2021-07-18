import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    DislikeActiveIconButton,
    DislikeIconButton,
    LikeActiveIconButton,
    LikeIconButton
} from "components/ui/IconButton";

import { DEFAULT_POST_RATE } from "utils/const/defaultValues";
import { POSTS_PREFIX } from "utils/const/actionTypeAffixes";
import CappedCount from "components/ui/CappedCount";
import Rating from "components/ui/Icon/Rating.component";
import { defaultProps, propTypes } from "./PostRating.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { voteForPostStart } from "redux/posts/posts.actions";
import styles from "./PostRating.module.scss";

PostRating.defaultProps = defaultProps;
PostRating.propTypes = propTypes;

function PostRating ({
    currentUser,
    isDisabled,
    isPending,
    onVoteForPostStart,
    post,
    withoutControls
}) {
    const {
        id,
        rating,
        userIdsVotedDown = [],
        userIdsVotedUp = []
    } = post;

    const votedUp = userIdsVotedUp.includes(currentUser?.id);
    const votedDown = userIdsVotedDown.includes(currentUser?.id);

    const voteForPost = (isLike, hasVoted) => {
        if (!onVoteForPostStart) return;

        const rate = (isLike)
            ? DEFAULT_POST_RATE
            : -DEFAULT_POST_RATE;

        onVoteForPostStart({
            id,
            userId: currentUser?.id,
            value: (hasVoted) ? 0 : rate
        });
    };

    const likePost = () => voteForPost(true, votedUp);
    const dislikePost = () => voteForPost(false, votedDown);

    const title = (isDisabled)
        ? "Автор и незарегистрированные пользователи не могут участвовать в оценивании"
        : "";

    const commonProps = {
        className: (isDisabled) ? styles.disabledIconButton : "",
        disabled: isDisabled || isPending,
        title
    };

    const likeButton = (votedUp)
        ? <LikeActiveIconButton {...commonProps} onClick={likePost} />
        : <LikeIconButton {...commonProps} onClick={likePost} />;

    const dislikeButton = (votedDown)
        ? <DislikeActiveIconButton {...commonProps} onClick={dislikePost} />
        : <DislikeIconButton {...commonProps} onClick={dislikePost} />;

    const formattedRating = (rating > 0)
        ? `+${rating}`
        : rating;

    return (
        <section
            className={styles.container}
            title={`Оценка: ${formattedRating}`}
        >
            {(!withoutControls)
                ? likeButton
                : <Rating size={30} />}

            <div className={styles.rating}>
                <span className={styles.description}>Оценка:&nbsp;</span>
                <CappedCount count={rating} showDynamics />
            </div>

            {!withoutControls && dislikeButton}
        </section>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isPending: (state, ownProps) => Boolean(selectRelevantPendingAction(state, {
        actionPrefix: POSTS_PREFIX,
        prop: { id: +ownProps.post?.id }
    }))
});

const mapDispatchToProps = (dispatch) => ({
    onVoteForPostStart: (props) => dispatch(voteForPostStart(props))
});

const ConnectedPostRating = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostRating);

export default ConnectedPostRating;
