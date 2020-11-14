import { Link } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { SEARCH_POSTS } from "utils/const/events";
import { fetchPostsStart } from "redux/posts/posts.actions";
import { propTypes } from "./PostsTab.props";
import { selectCount } from "redux/postsPaging/postsPaging.selectors";
import pubsub from "utils/pubsub";
import styles from "./PostsTab.module.scss";

PostsTab.propTypes = propTypes;

function PostsTab ({ onFetchPostsStart, postsOnPageCount }) {
    const [resetSearchIsShown, setResetSearchIsShown] = useState(false);

    const resetSearch = useCallback(() => onFetchPostsStart({
        count: postsOnPageCount,
        page: 1
    }, () => setResetSearchIsShown(false)), [onFetchPostsStart, postsOnPageCount]);

    const resetSearchTab = (
        <button
            className={styles.resetSearchButton}
            onClick={resetSearch}
            title="Сбросить поиск"
        >
            Сбросить поиск
        </button>
    );

    const showPostsTab = (
        <Link
            title="Статьи"
            to="/"
        >
            Статьи
        </Link>
    );

    useEffect(() => {
        const showResetSearch = (searchTerm = "") => {
            setResetSearchIsShown(searchTerm.length > 0);
        };

        pubsub.subscribe(SEARCH_POSTS, showResetSearch);
        return () => pubsub.unsubscribe(SEARCH_POSTS, showResetSearch);
    }, []);

    return (resetSearchIsShown)
        ? resetSearchTab
        : showPostsTab;
}

const mapStateToProps = createStructuredSelector({
    postsOnPageCount: selectCount
});

const mapDispatchToProps = (dispatch) => ({
    onFetchPostsStart: (options, cb) => dispatch(fetchPostsStart(options, cb))
});

const ConnectedPostsTab = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostsTab);

export default ConnectedPostsTab;
