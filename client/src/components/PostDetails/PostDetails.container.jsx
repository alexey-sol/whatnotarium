import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import { POST } from "utils/const/pathnames";
import PostDetails from "./PostDetails.component";
import { defaultProps, propTypes } from "./PostDetails.container.props";

import {
    createPostReset,
    getPost,
    updatePostReset
} from "redux/post/post.actions";

import {
    selectCreatedPost,
    selectFetchedPosts,
    selectPost,
    selectUpdatedPost
} from "redux/post/post.selectors";

import { selectCurrentUser } from "redux/session/session.selectors";
import findModifiedStateItem from "utils/redux/findModifiedStateItem";

PostDetailsContainer.defaultProps = defaultProps;
PostDetailsContainer.propTypes = propTypes;

function PostDetailsContainer ({
    createdPost,
    currentUser,
    fetchedPosts,
    history,
    match,
    onCreatePostReset,
    onGetPost,
    onUpdatePostReset,
    post,
    updatedPost
}) {
    const { push } = history;
    const { items } = fetchedPosts;
    const id = +match.params.id;

    const modifiedPost = findModifiedStateItem(createdPost, updatedPost);
    const hasModifiedPost = Boolean(modifiedPost.item);

    const redirectToDraft = useCallback(() => push(`${POST}/${id}/edit`), [id, push]);

    const clearPostStateIfNeeded = useCallback(() => {
        if (hasModifiedPost) {
            onCreatePostReset();
            onUpdatePostReset();
        }
    }, [hasModifiedPost, onCreatePostReset, onUpdatePostReset]);

    const shouldGetPost = items?.length > 0 && !post;

    useEffect(() => {
        if (shouldGetPost) {
            onGetPost(id);
        }

        return () => {
            clearPostStateIfNeeded();
        };
    }, [clearPostStateIfNeeded, id, onGetPost, shouldGetPost]);

    const popupText = (modifiedPost.item)
        ? "Сохранено"
        : modifiedPost.error?.message;

    const popupTheme = (modifiedPost.item)
        ? "success"
        : "error";

    return (
        <PostDetails
            handleClickOnEditButton={redirectToDraft}
            hidePopup={clearPostStateIfNeeded}
            popupText={popupText}
            popupTheme={popupTheme}
            post={post}
            userId={currentUser?.id}
        />
    );
}

const mapStateToProps = createStructuredSelector({
    createdPost: selectCreatedPost,
    currentUser: selectCurrentUser,
    fetchedPosts: selectFetchedPosts,
    post: selectPost,
    updatedPost: selectUpdatedPost
});

const mapDispatchToProps = (dispatch) => ({
    onCreatePostReset: () => dispatch(createPostReset()),
    onGetPost: (id) => dispatch(getPost(id)),
    onUpdatePostReset: () => dispatch(updatePostReset())
});

const ConnectedPostDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetailsContainer);

export default withRouter(ConnectedPostDetails);
