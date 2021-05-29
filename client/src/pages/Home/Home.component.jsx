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
import QSParser from "utils/parsers/QSParser";
import Spinner from "components/ui/Spinner";
import { defaultProps, propTypes } from "./Home.props";
import { fetchPostsStart, searchPostsStart } from "redux/posts/posts.actions";

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
    onSearchPostsStart,
    posts,
    postsOnPageCount,
    totalCount
}) {
    const locationKey = location.key;
    const pageNumber = match.params.number || currentPostsPage;
    const userId = currentUser?.id;
    const isAdmin = currentUser?.isAdmin;

    const [searchTerm, setSearchTerm] = useState("");
    const resetSearchingIsShown = searchTerm.length > 0;

    const qs = location.search;
    const qsParser = new QSParser(qs);
    const { st: stFromQuery } = qsParser.parse();

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
    }, [ // eslint-disable-line
        isAdmin, locationKey, onFetchPostsStart, pageNumber, postsOnPageCount, userId
    ]);

    const searchPosts = useCallback(() => onSearchPostsStart({
        count: postsOnPageCount,
        page: pageNumber,
        searchTerm: stFromQuery
    }), [onSearchPostsStart, pageNumber, postsOnPageCount, stFromQuery]);

    useEffect(() => {
        if (stFromQuery) {
            searchPosts();
        } else {
            fetchPosts();
        }
    }, [fetchPosts, searchPosts, stFromQuery]);

    useEffect(() => {
        const showResetSearchButton = (st) => {
            setSearchTerm(st);
        };

        pubsub.subscribe(SEARCH_POSTS, showResetSearchButton);
        return () => pubsub.unsubscribe(SEARCH_POSTS, showResetSearchButton);
    }, []);

    if (isPending) {
        return <Spinner />;
    }

    return (
        <Fragment>
            {resetSearchingIsShown && (
                <div className={styles.resetSearchingButton}>
                    <Link
                        onClick={() => setSearchTerm("")}
                        to="/"
                    >
                        Сбросить поиск
                    </Link>
                </div>
            )}

            <PostList
                currentPage={+pageNumber}
                posts={posts}
                searchTerm={searchTerm}
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
    onFetchPostsStart: (options) => dispatch(fetchPostsStart(options)),
    onSearchPostsStart: (options) => dispatch(searchPostsStart(options))
});

const ConnectedHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default ConnectedHome;
