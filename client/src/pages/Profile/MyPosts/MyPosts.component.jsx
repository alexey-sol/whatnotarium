import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { matchPath } from "react-router";

import * as p from "utils/const/pathnames";
import ProfileContent from "components/ProfileContent";
import PostList from "components/PostList";
import { MY_POSTS } from "utils/const/profileTabNames";
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
    onFetchPostsStart,
    posts,
    postsOnPageCount,
    totalCount
}) {
    const match = matchPath(location.pathname, {
        path: `/${p.PROFILE}/${p.MY_POSTS}/page:number`,
        exact: true,
        strict: false
    });

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
