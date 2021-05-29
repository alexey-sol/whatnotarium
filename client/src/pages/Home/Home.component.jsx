import { Link } from "react-router-dom";

import React, {
    Fragment,
    useCallback,
    useEffect,
    useState
} from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { POSTS_PREFIX } from "utils/const/actionTypeAffixes";
import { SEARCH_POSTS } from "utils/const/events";
import PostList from "components/posts/PostList";
import Spinner from "components/ui/Spinner";
import { defaultProps, propTypes } from "./Home.props";
import { fetchPostsStart } from "redux/posts/posts.actions";

import {
    selectCount,
    selectCurrentPage,
    selectTotalCount
} from "redux/postsPaging/postsPaging.selectors";

import { selectCurrentUser } from "redux/session/session.selectors";
import { selectPosts } from "redux/posts/posts.selectors";
import { selectRelevantPendingAction } from "redux/ui/ui.selectors";
import pubsub from "utils/pubsub";
import styles from "./Home.module.scss";

Home.defaultProps = defaultProps;
Home.propTypes = propTypes;

function Home ({
    currentPostsPage,
    currentUser,
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
    const userId = currentUser?.id;
    const isAdmin = currentUser?.isAdmin;

    const [resetSearchingIsShown, setResetSearchingIsShown] = useState(false);

    const fetchPosts = useCallback(() => {
        const optionsForRegularUser = {
            count: postsOnPageCount,
            operators: userId && { conjunctionOp: "$or" },
            page: pageNumber,
            where: { isApproved: true, userId }
        };

        const optionsForAdmin = {
            count: postsOnPageCount,
            page: pageNumber,
            where: { isApproved: false }
        };

        onFetchPostsStart((isAdmin)
            ? optionsForAdmin
            : optionsForRegularUser);
    }, [isAdmin, locationKey, onFetchPostsStart, pageNumber, postsOnPageCount, userId]); // eslint-disable-line

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        const showResetSearchButton = (searchTerm) => {
            setResetSearchingIsShown(searchTerm.length > 0);

            if (!searchTerm) {
                fetchPosts();
            }
        };

        pubsub.subscribe(SEARCH_POSTS, showResetSearchButton);
        return () => pubsub.unsubscribe(SEARCH_POSTS, showResetSearchButton);
    }, [fetchPosts]);

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
                hasSearchTerm={resetSearchingIsShown}
                posts={posts}
                totalCount={totalCount}
            />
        </Fragment>
    );
}

const mapStateToProps = createStructuredSelector({
    currentPostsPage: selectCurrentPage,
    currentUser: selectCurrentUser,
    isPending: (state) => Boolean(selectRelevantPendingAction(state, {
        actionPrefix: POSTS_PREFIX
    })),
    posts: selectPosts,
    postsOnPageCount: selectCount,
    totalCount: selectTotalCount
});

const mapDispatchToProps = (dispatch) => ({
    onFetchPostsStart: (options) => dispatch(fetchPostsStart(options))
});

const ConnectedHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default ConnectedHome;
