import { Link } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import { POSTS_PREFIX } from "utils/const/actionTypeAffixes";
import { SEARCH_POSTS } from "utils/const/events";
import PostList from "components/PostList";
import Spinner from "components/Spinner";
import { defaultProps, propTypes } from "./Home.props";
import { fetchPostsStart } from "redux/posts/posts.actions";
import { selectCount, selectCurrentPage } from "redux/postsPaging/postsPaging.selectors";
import { selectPosts } from "redux/posts/posts.selectors";
import { selectRelevantPendingAction } from "redux/ui/ui.selectors";
import pubsub from "utils/pubsub";
import styles from "./Home.module.scss";

Home.defaultProps = defaultProps;
Home.propTypes = propTypes;

function Home ({
    currentPostsPage,
    isPending,
    location,
    match,
    onFetchPostsStart,
    posts,
    postsOnPageCount
}) {
    const locationKey = location.key;
    const pageNumber = match.params.number || currentPostsPage;
    const [resetSearchingIsShown, setResetSearchingIsShown] = useState(false);

    useEffect(() => {
        const showResetSearchButton = (searchTerm) => {
            setResetSearchingIsShown(searchTerm.length > 0);
        };

        pubsub.subscribe(SEARCH_POSTS, showResetSearchButton);
        return () => pubsub.unsubscribe(SEARCH_POSTS, showResetSearchButton);
    }, []);

    useEffect(() => {
        onFetchPostsStart({
            count: postsOnPageCount,
            page: pageNumber
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

            <PostList posts={posts} />
        </Fragment>
    );
}

const mapStateToProps = () => {
    return (state) => ({
        currentPostsPage: selectCurrentPage(state),
        isPending: Boolean(selectRelevantPendingAction(state, { actionPrefix: POSTS_PREFIX })),
        posts: selectPosts(state),
        postsOnPageCount: selectCount(state)
    });
};

const mapDispatchToProps = (dispatch) => ({
    onFetchPostsStart: (options) => dispatch(fetchPostsStart(options))
});

const ConnectedHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default ConnectedHome;
