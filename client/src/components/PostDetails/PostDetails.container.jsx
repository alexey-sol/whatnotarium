import React, { useCallback } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { POST } from "utils/const/pathnames";
import PostDetails from "./PostDetails.component";
import { defaultProps, propTypes } from "./PostDetails.container.props";
import { fetchPostStart } from "redux/posts/posts.actions";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectPostById } from "redux/posts/posts.selectors";

PostDetailsContainer.defaultProps = defaultProps;
PostDetailsContainer.propTypes = propTypes;

function PostDetailsContainer ({
    currentUser,
    history,
    match,
    onFetchPostStart,
    post
}) {
    const { push } = history;
    const id = +match.params.id;

    const redirectToDraft = useCallback(() => push(`/${POST}/${id}/edit`), [id, push]);
    const shouldFetchPost = !post.id;

    if (shouldFetchPost) {
        onFetchPostStart(id);
    }

    return (
        <PostDetails
            currentUserId={currentUser?.id}
            handleClickOnEditButton={redirectToDraft}
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
    onFetchPostStart: (id) => dispatch(fetchPostStart(id))
});

const ConnectedPostDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetailsContainer);

export default withRouter(ConnectedPostDetails);
