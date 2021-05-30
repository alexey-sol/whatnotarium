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
import { setCurrentPage } from "redux/postsPaging/postsPaging.actions";
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
    onSetCurrentPage,
    posts,
    postsOnPageCount,
    totalCount
}) {
    const locationKey = location.key;
    const { number } = match.params;
    const pageNumber = number || currentPostsPage;

    const userId = currentUser?.id;
    const isAdmin = currentUser?.isAdmin;

    const qs = location.search;
    const qsParser = new QSParser(qs);
    const { st: stFromQuery } = qsParser.parse();

    const [searchTerm, setSearchTerm] = useState("");
    const hasSt = searchTerm || stFromQuery;

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

    const resetSearch = () => {
        setSearchTerm("");
        onSetCurrentPage(1);
    };

    useEffect(() => {
        if (number) {
            onSetCurrentPage(+number);
        }
    }, [number, onSetCurrentPage]);

    useEffect(() => {
        if (stFromQuery) {
            searchPosts();
        } else {
            fetchPosts();
        }
    }, [fetchPosts, searchPosts, stFromQuery]);

    useEffect(() => {
        const setSt = (st) => setSearchTerm(st);
        pubsub.subscribe(SEARCH_POSTS, setSt);
        return () => pubsub.unsubscribe(SEARCH_POSTS, setSt);
    }, []);

    if (isPending) {
        return <Spinner />;
    }

    return (
        <Fragment>
            {hasSt && (
                <div className={styles.resetSearchingButton}>
                    <Link
                        onClick={resetSearch}
                        to="/"
                    >
                        Сбросить поиск
                    </Link>
                </div>
            )}

            <PostList
                posts={posts}
                searchTerm={searchTerm || stFromQuery}
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
    onSearchPostsStart: (options) => dispatch(searchPostsStart(options)),
    onSetCurrentPage: (page) => dispatch(setCurrentPage(page))
});

const ConnectedHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default ConnectedHome;
