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
    findAffectedPost,
    selectFetchedPosts,
    selectPost
} from "redux/post/post.selectors";

import { selectCurrentUser } from "redux/session/session.selectors";

PostDetailsContainer.defaultProps = defaultProps;
PostDetailsContainer.propTypes = propTypes;

function PostDetailsContainer ({
    affectedPost,
    currentUser,
    fetchedPosts,
    history,
    match,
    onCreatePostReset,
    onGetPost,
    onUpdatePostReset,
    post
}) {
    const { push } = history;
    const { items } = fetchedPosts;
    const id = +match.params.id;

    const redirectToDraft = useCallback(() => push(`${POST}/${id}/edit`), [id, push]);

    const popupText = (affectedPost.item)
        ? "Сохранено"
        : affectedPost.error?.message;

    const popupTheme = (affectedPost.item)
        ? "success"
        : "error";

    const hasAffectedPost = Boolean(affectedPost.item);

    const clearStorageIfNeeded = useCallback(() => {
        if (hasAffectedPost) {
            onCreatePostReset();
            onUpdatePostReset();
        }
    }, [hasAffectedPost, onCreatePostReset, onUpdatePostReset]);

    const shouldGetPost = items?.length > 0 && !post;

    useEffect(() => {
        if (shouldGetPost) {
            onGetPost(id);
        }

        return () => {
            clearStorageIfNeeded();
        };
    }, [clearStorageIfNeeded, id, onGetPost, shouldGetPost]);

    return (
        <PostDetails
            handleClickOnEditButton={redirectToDraft}
            hidePopup={clearStorageIfNeeded}
            popupText={popupText}
            popupTheme={popupTheme}
            post={post}
            userId={currentUser?.id}
        />
    );
}

const mapStateToProps = createStructuredSelector({
    affectedPost: findAffectedPost,
    currentUser: selectCurrentUser,
    fetchedPosts: selectFetchedPosts,
    post: selectPost
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
