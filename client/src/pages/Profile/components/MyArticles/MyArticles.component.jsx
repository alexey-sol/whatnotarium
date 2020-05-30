import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { defaultProps, propTypes } from "./MyArticles.props";
import { getPostsStart } from "redux/post/post.actions";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectGottenPosts } from "redux/post/post.selectors";
import Posts from "components/Posts";
import styles from "./MyArticles.module.scss";

MyArticles.defaultProps = defaultProps;
MyArticles.propTypes = propTypes;

function MyArticles ({ currentUser, onGetPostsStart, posts }) {
    const { id: userId } = currentUser || {};

    useEffect(() => {
        if (userId) {
            onGetPostsStart({ userId }); // TODO: limit, offset
        }
    }, [onGetPostsStart, userId]);

    return (
        <div className={styles.container}>
            <Posts posts={posts} />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    posts: selectGottenPosts
});

const mapDispatchToProps = (dispatch) => ({
    onGetPostsStart: (filter) => dispatch(getPostsStart(filter))
});

const ConnectedMyArticles = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyArticles);

export default ConnectedMyArticles;
