import { Link } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { matchPath } from "react-router";

import * as p from "utils/const/pathnames";
import { POSTS_PREFIX } from "utils/const/actionTypeAffixes";
import PostList from "components/PostList";
import Spinner from "components/Spinner";
import { defaultProps, propTypes } from "./UnapprovedPosts.props";
import { fetchPostsStart } from "redux/posts/posts.actions";

import {
    selectCount,
    selectCurrentPage,
    selectTotalCount
} from "redux/postsPaging/postsPaging.selectors";

import { selectPosts } from "redux/posts/posts.selectors";
import { selectRelevantPendingAction } from "redux/ui/ui.selectors";
import getPathPrefix from "utils/helpers/getPathPrefix";
import styles from "./UnapprovedPosts.module.scss";

UnapprovedPosts.defaultProps = defaultProps;
UnapprovedPosts.propTypes = propTypes;

function UnapprovedPosts ({
    currentPostsPage,
    isPending,
    location,
    match,
    onFetchPostsStart,
    posts,
    postsOnPageCount,
    totalCount
}) {
    const [resetSearchingIsShown, setResetSearchingIsShown] = useState(false);

    const locationKey = location.key;
    const pageNumber = match?.params.number || currentPostsPage;

    useEffect(() => {
        onFetchPostsStart({
            count: postsOnPageCount,
            page: pageNumber,
            where: { isApproved: false }
        });
    }, [locationKey, onFetchPostsStart, pageNumber, postsOnPageCount]);

    if (isPending) {
        return <Spinner />;
    }

    return (
        <Fragment>
            {resetSearchingIsShown && (
                <div className={styles.resetSearchingButton}>
                    <Link
                        onClick={() => setResetSearchingIsShown(false)}
                        to="/"
                    >
                        Сбросить поиск
                    </Link>
                </div>
            )}

            <PostList
                currentPage={+pageNumber}
                pathPrefix={getPathPrefix(location.pathname)}
                posts={posts}
                totalCount={totalCount}
            />
        </Fragment>
    );
}

const mapStateToProps = () => {
    return (state) => ({
        currentPostsPage: selectCurrentPage(state),
        isPending: Boolean(selectRelevantPendingAction(state, { actionPrefix: POSTS_PREFIX })),
        posts: selectPosts(state),
        postsOnPageCount: selectCount(state),
        totalCount: selectTotalCount(state)
    });
};

const mapDispatchToProps = (dispatch) => ({
    onFetchPostsStart: (options) => dispatch(fetchPostsStart(options))
});

const ConnectedHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnapprovedPosts);

export default ConnectedHome;
