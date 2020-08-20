import React, { useCallback } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { POST } from "utils/const/pathnames";
import PostDetails from "./PostDetails.component";
import { defaultProps, propTypes } from "./PostDetails.container.props";
import { selectPostById } from "redux/posts/posts.selectors";
import { selectCurrentUser } from "redux/session/session.selectors";

PostDetailsContainer.defaultProps = defaultProps;
PostDetailsContainer.propTypes = propTypes;

function PostDetailsContainer ({
    currentUser,
    history,
    match,
    post
}) {
    const { push } = history;
    const id = +match.params.id;

    const redirectToDraft = useCallback(() => push(`/${POST}/${id}/edit`), [id, push]);

    return (
        <PostDetails
            handleClickOnEditButton={redirectToDraft}
            post={post}
            userId={currentUser?.id}
        />
    );
}

const mapStateToProps = () => {
    return (state, ownProps) => ({
        currentUser: selectCurrentUser(state),
        post: selectPostById(state, +ownProps.match.params.id)
    });
};

const ConnectedPostDetails = connect(
    mapStateToProps
)(PostDetailsContainer);

export default withRouter(ConnectedPostDetails);
