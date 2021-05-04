import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import { POST, PROFILE } from "utils/const/pathnames";
import { RESET_POST } from "utils/const/events";
import { DEFAULT_TIMEOUT_IN_MS, SUCCESS } from "utils/const/notificationProps";
import { POSTS_PREFIX } from "utils/const/actionTypeAffixes";
import DraftEditor from "./DraftEditor.component";
import Notification from "utils/objects/Notification";

import {
    createPostStart,
    deletePostStart,
    fetchPostStart,
    updatePostStart
} from "redux/posts/posts.actions";

import { defaultProps, propTypes } from "./DraftEditor.container.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectPostById } from "redux/posts/posts.selectors";
import { selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { showNotification } from "redux/ui/ui.actions";
import phrases from "utils/resources/text/ru/commonPhrases";
import pubsub from "utils/pubsub";

const successNotification = new Notification(phrases.done, SUCCESS, DEFAULT_TIMEOUT_IN_MS);

DraftEditorContainer.defaultProps = defaultProps;
DraftEditorContainer.propTypes = propTypes;

function DraftEditorContainer ({
    currentUser,
    history,
    isPending,
    match,
    onCreatePostStart,
    onDeletePostStart,
    onFetchPostStart,
    onShowNotification,
    onUpdatePostStart,
    post
}) {
    const { push } = history;
    const paramId = match.params.id && +match.params.id;
    const [selectedPost, setSelectedPost] = useState(post);

    const id = paramId || selectedPost?.id;

    const redirectToPostAndShowSuccess = useCallback(postId => {
        push(`/${POST}/${postId}`);
        onShowNotification(successNotification);
    }, [onShowNotification, push]);

    const redirectToProfileAndShowSuccess = useCallback(() => {
        push(`/${PROFILE}`);
        onShowNotification(successNotification);
    }, [onShowNotification, push]);

    const handleChange = useCallback(({ name, value }) => {
        setSelectedPost({
            ...selectedPost,
            [name]: value
        });
    }, [selectedPost]);

    const createOrUpdatePost = (event) => {
        if (event) {
            event.preventDefault();
        }

        const { isApproved, isFrozen, ...rest } = selectedPost;
        const shouldCreateNewPost = !id;

        const postWithUserId = {
            ...rest,
            userId: currentUser.id
        };

        if (shouldCreateNewPost) {
            onCreatePostStart(postWithUserId, redirectToPostAndShowSuccess);
        } else {
            onUpdatePostStart(postWithUserId, redirectToPostAndShowSuccess);
        }
    };

    const deletePost = useCallback(() => {
        onDeletePostStart(id, redirectToProfileAndShowSuccess);
    }, [id, onDeletePostStart, redirectToProfileAndShowSuccess]);

    const shouldResetPostForNewDraft = !paramId && Boolean(selectedPost?.id);

    useEffect(() => {
        if (!post && paramId) {
            onFetchPostStart(id);
        }

        if (!selectedPost && post) {
            setSelectedPost(post);
        }
    }, [id, onFetchPostStart, paramId, post, selectedPost]);

    useEffect(() => {
        if (shouldResetPostForNewDraft) {
            pubsub.publish(RESET_POST);
        }
    }, [shouldResetPostForNewDraft]);

    return (
        <DraftEditor
            deletePost={deletePost}
            handleChange={handleChange}
            handleSubmit={createOrUpdatePost}
            isPending={isPending}
            post={selectedPost}
            setSelectedPost={setSelectedPost}
        />
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isPending: (state) => Boolean(selectRelevantPendingAction(state, {
        actionPrefix: POSTS_PREFIX
    })),
    post: (state, ownProps) => selectPostById(state, +ownProps.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    onCreatePostStart: (props, cb) => dispatch(createPostStart(props, cb)),
    onDeletePostStart: (id, cb) => dispatch(deletePostStart(id, cb)),
    onFetchPostStart: (id, cb) => dispatch(fetchPostStart(id, cb)),
    onShowNotification: (notification) => dispatch(showNotification(notification)),
    onUpdatePostStart: (props, cb) => dispatch(updatePostStart(props, cb))
});

const ConnectedDraftEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(DraftEditorContainer);

export default withRouter(ConnectedDraftEditor);
