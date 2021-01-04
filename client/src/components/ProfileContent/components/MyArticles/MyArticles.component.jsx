import React, { useEffect } from "react";
import { connect } from "react-redux";

import PostList from "components/PostList";
import Spinner from "components/Spinner";
import { POSTS_PREFIX } from "utils/const/actionTypeAffixes";
import { defaultProps, propTypes } from "./MyArticles.props";
import { fetchPostsStart } from "redux/posts/posts.actions";

import {
    selectCount,
    selectCurrentPage
} from "redux/postsPaging/postsPaging.selectors";

import { selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { selectUserPosts } from "redux/posts/posts.selectors";
import styles from "./MyArticles.module.scss";

MyArticles.defaultProps = defaultProps;
MyArticles.propTypes = propTypes;

function MyArticles ({
    currentPostsPage,
    isPending,
    onFetchPostsStart,
    postsOnPageCount,
    totalCount,
    userPosts
}) {
    console.log('----', totalCount)
    useEffect(() => {
        onFetchPostsStart({
            count: postsOnPageCount,
            page: currentPostsPage
        });
    }, [currentPostsPage, onFetchPostsStart, postsOnPageCount]);

    if (isPending) {
        return <Spinner />;
    }

    return (
        <div className={styles.container}>
            <PostList
                posts={userPosts}
                totalCount={totalCount}
            />
        </div>
    );
}

const mapStateToProps = () => {
    return (state, ownProps) => ({
        currentPostsPage: selectCurrentPage(state),
        isPending: Boolean(selectRelevantPendingAction(state, { actionPrefix: POSTS_PREFIX })),
        postsOnPageCount: selectCount(state),
        // totalCount: selectUserPostsTotalCount(state/*, ownProps.currentUser.id*/),
        userPosts: selectUserPosts(state, ownProps.currentUser.id)
    });
};

const mapDispatchToProps = (dispatch) => ({
    onFetchPostsStart: (options) => dispatch(fetchPostsStart(options))
});

const ConnectedMyArticles = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyArticles);

export default ConnectedMyArticles;
