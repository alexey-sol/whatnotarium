import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import * as p from "utils/const/pathnames";
import { DEFAULT_TIMEOUT_IN_MS, SUCCESS } from "utils/const/notificationProps";
import Notification from "utils/objects/Notification";
import PostDetails from "./PostDetails.component";
import { approvePostStart, rejectPostStart } from "redux/admin/admin.actions";
import { defaultProps, propTypes } from "./PostDetails.container.props";
import { fetchPostStart, incrementViewCountStart } from "redux/posts/posts.actions";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectPostById } from "redux/posts/posts.selectors";
import { showNotification } from "redux/ui/ui.actions";
import phrases from "utils/resources/text/ru/commonPhrases";

const successNotification = new Notification(phrases.done, SUCCESS, DEFAULT_TIMEOUT_IN_MS);

PostDetailsContainer.defaultProps = defaultProps;
PostDetailsContainer.propTypes = propTypes;

function PostDetailsContainer ({
    currentUser,
    history,
    match,
    onApprovePostStart,
    onFetchPostStart,
    onIncrementViewCountStart,
    onRejectPostStart,
    onShowNotification,
    post
}) {
    const [viewCountUpdated, setViewCountUpdated] = useState(false);

    const { push } = history;
    const { isAdmin } = currentUser || {};
    const id = +match.params.id;

    const shouldFetchPost = !post.id;

    const shouldIncrementViewCount = (
        !shouldFetchPost && !viewCountUpdated && !isAdmin &&
        !post.isFrozen && post.isApproved
    );

    useEffect(() => {
        if (shouldFetchPost) {
            onFetchPostStart(id);
        }
    }, [id, onFetchPostStart, shouldFetchPost]);

    useEffect(() => {
        if (shouldIncrementViewCount) {
            onIncrementViewCountStart(id, () => setViewCountUpdated(true));
        }
    }, [id, onIncrementViewCountStart, shouldIncrementViewCount]);

    const redirectToDraft = useCallback(() => push(`/${p.POST}/${id}/${p.EDIT}`), [id, push]);

    const redirectToListAndShowSuccess = useCallback(() => {
        push("/");
        onShowNotification(successNotification);
    }, [onShowNotification, push]);

    return (
        <PostDetails
            approvePost={() => onApprovePostStart({ id }, redirectToListAndShowSuccess)}
            currentUser={currentUser}
            handleClickOnEditButton={redirectToDraft}
            post={post}
            rejectPost={message => onRejectPostStart({ id, message }, redirectToListAndShowSuccess)}
        />
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    post: (state, ownProps) => selectPostById(state, +ownProps.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    onApprovePostStart: (payload, cb) => dispatch(approvePostStart(payload, cb)),
    onFetchPostStart: (id) => dispatch(fetchPostStart(id)),
    onIncrementViewCountStart: (postId, cb) => dispatch(incrementViewCountStart(postId, cb)),
    onRejectPostStart: (payload, cb) => dispatch(rejectPostStart(payload, cb)),
    onShowNotification: (notification) => dispatch(showNotification(notification))
});

const ConnectedPostDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetailsContainer);

export default withRouter(ConnectedPostDetails);
