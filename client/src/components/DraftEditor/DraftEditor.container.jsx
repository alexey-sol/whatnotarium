import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import { POST, PROFILE } from "utils/const/pathnames";
import { POST_BODY_LENGTH, POST_TITLE_LENGTH } from "utils/const/limits";
import DraftEditor from "./DraftEditor.component";

import {
    createPostReset,
    createPostStart,
    deletePostReset,
    deletePostStart,
    fetchPostReset,
    getPost,
    updatePostReset,
    updatePostStart
} from "redux/post/post.actions";

import { defaultProps, propTypes } from "./DraftEditor.container.props";
import { selectCurrentUser } from "redux/session/session.selectors";

import {
    selectCreatedPost,
    selectDeletedPost,
    selectFetchedPosts,
    selectPost,
    selectUpdatedPost
} from "redux/post/post.selectors";

import findModifiedStateItem from "utils/redux/findModifiedStateItem";
import translateError from "utils/helpers/translateError";

DraftEditorContainer.defaultProps = defaultProps;
DraftEditorContainer.propTypes = propTypes;

function DraftEditorContainer ({
    createdPost,
    currentUser,
    deletedPost,
    fetchedPosts,
    history,
    match,
    onCreatePostReset,
    onCreatePostStart,
    onDeletePostReset,
    onDeletePostStart,
    onGetPost,
    onUpdatePostReset,
    onUpdatePostStart,
    post,
    updatedPost
}) {
    const { push } = history;
    const { items } = fetchedPosts;
    const paramId = match.params.id && +match.params.id;

    const [currentPost, setCurrentPost] = useState(post);
    const id = paramId || currentPost?.id || createdPost?.item?.id;

    const handleChange = useCallback(({ name, value }) => {
        setCurrentPost({
            ...currentPost,
            [name]: value
        });
    }, [currentPost]);

    const createOrUpdatePost = (event) => {
        if (event) {
            event.preventDefault();
        }

        const shouldCreateNewPost = !id;
        const postWithUserId = {
            ...currentPost,
            userId: currentUser.id
        };

        if (shouldCreateNewPost) {
            onCreatePostStart(postWithUserId);
        } else {
            onUpdatePostStart(postWithUserId);
        }
    };

    const modifiedPost = findModifiedStateItem(createdPost, deletedPost, updatedPost);
    const requestDidFail = Boolean(modifiedPost.error);

    const clearPostStateIfNeeded = useCallback(() => {
        if (requestDidFail) {
            onCreatePostReset();
            onDeletePostReset();
            onUpdatePostReset();
        }
    }, [requestDidFail, onCreatePostReset, onDeletePostReset, onUpdatePostReset]);

    const deletePost = useCallback(() => onDeletePostStart(id), [id, onDeletePostStart]);

    const redirectToPost = useCallback(() => {
        push(`${POST}/${id}`);
    }, [id, push]);

    const redirectToProfile = useCallback(() => {
        push(PROFILE);
    }, [push]);

    const shouldFetchPost = id && !currentPost;
    const shouldRedirectToPost = Boolean(createdPost.item || updatedPost.item);
    const shouldRedirectToProfile = Boolean(deletedPost.item);
    const shouldResetPostForNewDraft = !paramId && Boolean(post);

    const shouldGetPost = items?.length > 0 && !post;

    useEffect(() => {
        if (shouldResetPostForNewDraft) {
            setCurrentPost({});
        }
    }, [shouldResetPostForNewDraft]);

    useEffect(() => {
        if (shouldGetPost) {
            onGetPost();
        }

        if (shouldRedirectToPost) {
            redirectToPost();
        } else if (shouldRedirectToProfile) {
            redirectToProfile();
        }
    }, [
        onGetPost,
        redirectToPost,
        redirectToProfile,
        shouldGetPost,
        shouldRedirectToPost,
        shouldRedirectToProfile
    ]);

    useEffect(() => {
        if (shouldFetchPost) {
            onGetPost(id);
        }
    }, [id, onGetPost, shouldFetchPost]);

    const isPending =
        createdPost.isPending ||
        deletedPost.isPending ||
        updatedPost.isPending;

    const failedRequestMessage = translateError(
        createdPost.error ||
        deletedPost.error ||
        updatedPost.error
    );

    return (
        <DraftEditor
            deletePost={deletePost}
            handleChange={handleChange}
            handleSubmit={createOrUpdatePost}
            hidePopup={clearPostStateIfNeeded}
            isPending={isPending}
            popupText={failedRequestMessage}
            post={currentPost}
        />
    );
}

const mapStateToProps = createStructuredSelector({
    createdPost: selectCreatedPost,
    currentUser: selectCurrentUser,
    deletedPost: selectDeletedPost,
    fetchedPosts: selectFetchedPosts,
    post: selectPost,
    updatedPost: selectUpdatedPost
});

const mapDispatchToProps = (dispatch) => ({
    onCreatePostReset: () => dispatch(createPostReset()),
    onCreatePostStart: (props) => dispatch(createPostStart(props)),
    onDeletePostReset: () => dispatch(deletePostReset()),
    onDeletePostStart: (id) => dispatch(deletePostStart(id)),
    onFetchPostReset: () => dispatch(fetchPostReset()),
    onGetPost: (id) => dispatch(getPost(id)),
    onUpdatePostReset: () => dispatch(updatePostReset()),
    onUpdatePostStart: (props) => dispatch(updatePostStart(props))
});

const ConnectedDraftEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(DraftEditorContainer);

export default withRouter(ConnectedDraftEditor);
