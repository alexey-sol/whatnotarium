import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { DEFAULT_POST_VIEW_INCREMENT } from "utils/const/defaultValues";
import { POST } from "utils/const/pathnames";
import PostDetails from "./PostDetails.component";
import { defaultProps, propTypes } from "./PostDetails.container.props";
import { fetchPostStart, updatePostStart } from "redux/posts/posts.actions";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectPostById } from "redux/posts/posts.selectors";

PostDetailsContainer.defaultProps = defaultProps;
PostDetailsContainer.propTypes = propTypes;

function PostDetailsContainer ({
    currentUser,
    history,
    match,
    onFetchPostStart,
    onUpdatePostStart,
    post
}) {
    const [viewCountUpdated, setViewCountUpdated] = useState(false);
    const { viewCount } = post;
    const { push } = history;

    const id = +match.params.id;
    const redirectToDraft = useCallback(() => push(`/${POST}/${id}/edit`), [id, push]);
    const shouldFetchPost = !post.id;

    if (shouldFetchPost) {
        onFetchPostStart(id);
    }

    useEffect(() => {
        const shouldIncrementViewCount = Number.isInteger(viewCount) && !viewCountUpdated;

        if (shouldIncrementViewCount) {
            const updateViewProps = {
                id,
                viewCount: viewCount + DEFAULT_POST_VIEW_INCREMENT
            };

            onUpdatePostStart(updateViewProps);
            setViewCountUpdated(true);
        }
    }, [id, onUpdatePostStart, viewCount, viewCountUpdated]);

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
    onFetchPostStart: (id) => dispatch(fetchPostStart(id)),
    onUpdatePostStart: (props, cb) => dispatch(updatePostStart(props, cb))
});

const ConnectedPostDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetailsContainer);

export default withRouter(ConnectedPostDetails);
