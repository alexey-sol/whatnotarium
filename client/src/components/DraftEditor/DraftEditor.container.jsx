import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import { DEFAULT_TIMEOUT_IN_MS, ERROR, SUCCESS } from "utils/const/notificationProps";
import { MY_POSTS, POST, PROFILE } from "utils/const/pathnames";
import { POSTS_PREFIX } from "utils/const/actionTypeAffixes";
import { RESET_POST } from "utils/const/events";
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
    const shouldCreateNewPost = !id;
    const { skipPremoderation } = selectedPost || {};

    const getTextOnCreateOrUpdateSuccess = useCallback(() => {
        if (shouldCreateNewPost && skipPremoderation) {
            return "Статья опубликована";
        } else if (shouldCreateNewPost && !skipPremoderation) {
            return "Статья отправлена на проверку";
        } else {
            return "Статья обновлена";
        }
    }, [shouldCreateNewPost, skipPremoderation]);

    const redirectToPostAndShowSuccess = useCallback(postId => {
        push(`/${POST}/${postId}`);
        onShowNotification(getSuccessNotif(getTextOnCreateOrUpdateSuccess()));
    }, [getTextOnCreateOrUpdateSuccess, onShowNotification, push]);

    const redirectToProfileAndShowSuccess = useCallback(() => {
        push(`/${PROFILE}/${MY_POSTS}`);
        onShowNotification(getSuccessNotif("Статья удалена"));
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

        const { isApproved, isFrozen, ...rest } = selectedPost || {};

        if (!rest?.title || !rest?.body) {
            onShowNotification(getErrorNotif("Заголовок и тело статьи не могут быть пустыми"));
            return;
        }

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

function getSuccessNotif (text = phrases.done) {
    return new Notification(text, SUCCESS, DEFAULT_TIMEOUT_IN_MS);
}

function getErrorNotif (text = phrases.error) {
    return new Notification(text, ERROR, DEFAULT_TIMEOUT_IN_MS);
}
