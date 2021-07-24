import React, { Fragment, useCallback } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { SEARCH_POSTS } from "utils/const/events";
import PostList from "components/posts/PostList";
import ResetSearchButton from "components/ui/ResetSearchButton";
import { defaultProps, propTypes } from "./Home.props";
import { fetchPostsStart, searchPostsStart } from "redux/posts/posts.actions";

import {
    selectCount,
    selectCurrentPage,
    selectTotalCount
} from "redux/postsPaging/postsPaging.selectors";

import { selectCurrentUser } from "redux/session/session.selectors";
import { selectError } from "redux/session/session.selectors";
import { selectPosts } from "redux/posts/posts.selectors";
import { setCurrentPage } from "redux/postsPaging/postsPaging.actions";
import styles from "./Home.module.scss";
import usePagination from "utils/hooks/usePagination";

Home.defaultProps = defaultProps;
Home.propTypes = propTypes;

function Home ({
    currentPostsPage,
    currentUser,
    location,
    onFetchPostsStart,
    onSearchPostsStart,
    onSetCurrentPage,
    posts,
    postsOnPageCount,
    sessionError,
    totalCount
}) {
    const locationKey = location.key;

    const userId = currentUser?.id;
    const isAdmin = currentUser?.isAdmin;
    const hasSessionInfo = Boolean(sessionError || currentUser);

    const fetchPosts = useCallback(({ page }) => {
        const optionsForRegularUser = {
            count: postsOnPageCount,
            operators: userId && { conjunctionOp: "$or" },
            page,
            where: { isApproved: true, userId }
        };

        const optionsForAdmin = {
            count: postsOnPageCount,
            page,
            where: { isApproved: false }
        };

        if (hasSessionInfo) {
            onFetchPostsStart((isAdmin)
                ? optionsForAdmin
                : optionsForRegularUser);
        }
    }, [ // eslint-disable-line
        hasSessionInfo, isAdmin, locationKey, postsOnPageCount, userId
    ]);

    const searchPosts = useCallback(({ page, searchTerm }) => onSearchPostsStart({
        count: postsOnPageCount,
        page,
        searchTerm
    }), [onSearchPostsStart, postsOnPageCount]);

    const { qs, resetSearch } = usePagination({
        currentPage: currentPostsPage,
        fetchRecords: fetchPosts,
        onSetCurrentPage,
        searchEventName: SEARCH_POSTS,
        searchRecords: searchPosts
    });

    return (
        <Fragment>
            {Boolean(qs) && (
                <div className={styles.resetSearchButton}>
                    <ResetSearchButton onClick={resetSearch} />
                </div>
            )}

            <PostList
                posts={posts}
                qs={qs}
                totalCount={totalCount}
            />
        </Fragment>
    );
}

const mapStateToProps = createStructuredSelector({
    currentPostsPage: selectCurrentPage,
    currentUser: selectCurrentUser,
    posts: selectPosts,
    postsOnPageCount: selectCount,
    sessionError: selectError,
    totalCount: selectTotalCount
});

const mapDispatchToProps = (dispatch) => ({
    onFetchPostsStart: (options) => dispatch(fetchPostsStart(options)),
    onSearchPostsStart: (options) => dispatch(searchPostsStart(options)),
    onSetCurrentPage: (page) => dispatch(setCurrentPage(page))
});

const ConnectedHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default ConnectedHome;
