import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { MY_POSTS } from "utils/const/profileTabNames";
import ProfileContent from "components/profile/ProfileContent";
import PostList from "components/posts/PostList";
import { defaultProps, propTypes } from "./MyPosts.props";
import { fetchPostsStart } from "redux/posts/posts.actions";

import {
    selectCount,
    selectCurrentPage,
    selectTotalCount
} from "redux/postsPaging/postsPaging.selectors";

import { selectCurrentUser } from "redux/session/session.selectors";
import { selectPosts } from "redux/posts/posts.selectors";
import getPathPrefix from "utils/helpers/getPathPrefix";
import styles from "./MyPosts.module.scss";

MyPosts.defaultProps = defaultProps;
MyPosts.propTypes = propTypes;

function MyPosts ({
    currentPostsPage,
    currentUser,
    location,
    match,
    onFetchPostsStart,
    posts,
    postsOnPageCount,
    totalCount
}) {
    const userId = currentUser?.id;
    const locationKey = location.key;
    const pageNumber = match?.params.number || currentPostsPage;

    useEffect(() => {
        onFetchPostsStart({
            count: postsOnPageCount,
            page: pageNumber,
            where: { userId }
        });
    }, [locationKey, onFetchPostsStart, pageNumber, postsOnPageCount, userId]);

    return (
        <ProfileContent activeTabName={MY_POSTS}>
            <div className={styles.container}>
                <PostList
                    currentPage={+pageNumber}
                    pathPrefix={getPathPrefix(location.pathname, 3)}
                    posts={posts}
                    totalCount={totalCount}
                />
            </div>
        </ProfileContent>
    );
}

const mapStateToProps = () => createStructuredSelector({
    currentPostsPage: selectCurrentPage,
    currentUser: selectCurrentUser,
    posts: selectPosts,
    postsOnPageCount: selectCount,
    totalCount: selectTotalCount
});

const mapDispatchToProps = (dispatch) => ({
    onFetchPostsStart: (options) => dispatch(fetchPostsStart(options))
});

const ConnectedMyPosts = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyPosts);

export default ConnectedMyPosts;
