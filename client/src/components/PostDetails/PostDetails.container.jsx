import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { DEFAULT_POST_VIEW_INCREMENT } from "utils/const/defaultValues";
import { DEFAULT_TIMEOUT_IN_MS, SUCCESS } from "../../utils/const/notificationProps";
import { POST, UNAPPROVED_POSTS } from "utils/const/pathnames";
import PostDetails from "./PostDetails.component";
import { approvePostStart, rejectPostStart } from "redux/admin/admin.actions";
import { defaultProps, propTypes } from "./PostDetails.container.props";
import { fetchPostStart, updatePostStart } from "redux/posts/posts.actions";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectPostById } from "redux/posts/posts.selectors";
import { showNotification } from "redux/ui/ui.actions";
import Notification from "../../utils/objects/Notification";
import phrases from "../../utils/resources/text/ru/commonPhrases";

const successNotification = new Notification(phrases.done, SUCCESS, DEFAULT_TIMEOUT_IN_MS);

PostDetailsContainer.defaultProps = defaultProps;
PostDetailsContainer.propTypes = propTypes;

function PostDetailsContainer ({
    currentUser,
    history,
    match,
    onApprovePostStart,
    onFetchPostStart,
    onRejectPostStart,
    onShowNotification,
    onUpdatePostStart,
    post
}) {
    const [viewCountUpdated, setViewCountUpdated] = useState(false);
    const { push } = history;
    const { isAdmin } = currentUser || {};
    const { viewCount } = post;

    const id = +match.params.id;
    const shouldFetchPost = !post.id;
    const redirectToDraft = useCallback(() => push(`/${POST}/${id}/edit`), [id, push]);

    const redirectToListAndShowSuccess = useCallback(() => {
        push(`/${UNAPPROVED_POSTS}`);
        onShowNotification(successNotification);
    }, [onShowNotification, push]);

    if (shouldFetchPost) {
        onFetchPostStart(id);
    }

    useEffect(() => {
        const shouldIncrementViewCount = (
            Number.isInteger(viewCount) && !viewCountUpdated && !isAdmin
        );

        if (shouldIncrementViewCount) {
            const updateViewProps = {
                id,
                viewCount: viewCount + DEFAULT_POST_VIEW_INCREMENT
            };

            onUpdatePostStart(updateViewProps);
            setViewCountUpdated(true);
        }
    }, [id, isAdmin, onUpdatePostStart, viewCount, viewCountUpdated]);

    return (
        <PostDetails
            currentUser={currentUser}
            handleClickOnApproveButton={() => onApprovePostStart(id, redirectToListAndShowSuccess)}
            handleClickOnEditButton={redirectToDraft}
            handleClickOnRejectButton={() => onRejectPostStart(id, redirectToListAndShowSuccess)}
            post={post}
        />
    );
}

const mapStateToProps = () => {
    return (state, ownProps) => {
        const id = +ownProps.match.params.id;

        return ({
            currentUser: selectCurrentUser(state),
            post: selectPostById(state, id)
        });
    };
};

const mapDispatchToProps = (dispatch) => ({
    onApprovePostStart: (id, cb) => dispatch(approvePostStart(id, cb)),
    onFetchPostStart: (id) => dispatch(fetchPostStart(id)),
    onRejectPostStart: (id, cb) => dispatch(rejectPostStart(id, cb)),
    onShowNotification: (notification) => dispatch(showNotification(notification)),
    onUpdatePostStart: (props, cb) => dispatch(updatePostStart(props, cb))
});

const ConnectedPostDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetailsContainer);

export default withRouter(ConnectedPostDetails);
