import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { POST, PROFILE } from "utils/const/pathnames";
import DraftEditor from "./DraftEditor.component";

import {
    createPostStart,
    deletePostStart,
    updatePostStart
} from "redux/posts/posts.actions";

import { defaultProps, propTypes } from "./DraftEditor.container.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectIsPending } from "redux/ui/ui.selectors";
import { selectPostById } from "redux/posts/posts.selectors";
import { showNotification } from "redux/ui/ui.actions";

const successNotification = {
    text: "Готово",
    type: "success"
};

DraftEditorContainer.defaultProps = defaultProps;
DraftEditorContainer.propTypes = propTypes;

function DraftEditorContainer ({
    currentUser,
    history,
    isPending,
    match,
    onCreatePostStart,
    onDeletePostStart,
    onShowNotification,
    onUpdatePostStart,
    post
}) {
    const { push } = history;
    const paramId = match.params.id && +match.params.id;
    const [selectedPost, setSelectedPost] = useState(post);

    const id = paramId || selectedPost?.id; // TODO: do I need selectedPost?.id

    const redirectToPostAndShowSuccess = useCallback(postId => {
        push(`${POST}/${postId}`);
        onShowNotification(successNotification);
    }, [onShowNotification, push]);

    const redirectToProfileAndShowSuccess = useCallback(() => {
        push(PROFILE);
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

        const shouldCreateNewPost = !id;
        const postWithUserId = {
            ...selectedPost,
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

    const shouldResetPostForNewDraft = !paramId && Boolean(selectedPost);

    useEffect(() => {
        if (shouldResetPostForNewDraft) {
            setSelectedPost({});
        }
    }, [shouldResetPostForNewDraft]);

    return (
        <DraftEditor
            deletePost={deletePost}
            handleChange={handleChange}
            handleSubmit={createOrUpdatePost}
            isPending={isPending}
            post={selectedPost}
        />
    );
}

const mapStateToProps = () => {
    return (state, ownProps) => ({
        currentUser: selectCurrentUser(state),
        isPending: selectIsPending(state),
        post: selectPostById(state, +ownProps.match.params.id)
    });
};

const mapDispatchToProps = (dispatch) => ({
    onCreatePostStart: (props, cb) => dispatch(createPostStart(props, cb)),
    onDeletePostStart: (id, cb) => dispatch(deletePostStart(id, cb)),
    onShowNotification: (notification) => dispatch(showNotification(notification)),
    onUpdatePostStart: (props, cb) => dispatch(updatePostStart(props, cb))
});

const ConnectedDraftEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(DraftEditorContainer);

export default withRouter(ConnectedDraftEditor);
