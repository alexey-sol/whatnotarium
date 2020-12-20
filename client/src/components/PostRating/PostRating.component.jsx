import React, { Fragment } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import {
    DislikeActiveIconButton,
    DislikeIconButton,
    LikeActiveIconButton,
    LikeIconButton
} from "components/IconButton";

import { DEFAULT_POST_RATE } from "utils/const/defaultValues";
import { POSTS_PREFIX } from "utils/const/actionTypeAffixes";
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
        disabled: isDisabled || isPending,
        title
    };

    const likeButton = (votedUp)
        ? <LikeActiveIconButton {...commonProps} onClick={likePost} />
        : <LikeIconButton {...commonProps} onClick={likePost} />;

    const dislikeButton = (votedDown)
        ? <DislikeActiveIconButton {...commonProps} onClick={dislikePost} />
        : <DislikeIconButton {...commonProps} onClick={dislikePost} />;

    const ratingClassNames = classnames(
        styles.rating,
        (rating > 0) ? styles.positive : "",
        (rating < 0) ? styles.negative : ""
    );

    const formattedRating = (rating > 0)
        ? `+${rating}`
        : rating;

    return (
        <section className={styles.container}>
            {(!withoutControls) && (
                <Fragment>
                    {likeButton}
                    {dislikeButton}
                </Fragment>
            )}

            <div className={ratingClassNames} title={`Оценка: ${formattedRating}`}>
                {formattedRating}
            </div>
        </section>
    );
}

const mapStateToProps = () => {
    return (state, props) => {
        const { id } = props.post;

        const options = {
            actionPrefix: POSTS_PREFIX,
            prop: { id }
        };

        return ({
            currentUser: selectCurrentUser(state),
            isPending: Boolean(selectRelevantPendingAction(state, options))
        });
    };
};

const mapDispatchToProps = (dispatch) => ({
    onVoteForPostStart: (props) => dispatch(voteForPostStart(props))
});

const ConnectedPostRating = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostRating);

export default ConnectedPostRating;
