import { Link } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import { NOT_APPROVED } from "utils/const/postStatuses";
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
    const locationKey = location.key;
    const pageNumber = match.params.number || currentPostsPage;
    const [resetSearchingIsShown, setResetSearchingIsShown] = useState(false);

    useEffect(() => {
        onFetchPostsStart({
            count: postsOnPageCount,
            page: pageNumber,
            where: { status: NOT_APPROVED }
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

            <PostList posts={posts} totalCount={totalCount} />
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
