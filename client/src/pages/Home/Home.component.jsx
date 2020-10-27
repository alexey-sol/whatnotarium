import React, { useEffect } from "react";
import { connect } from "react-redux";

import { POSTS_PREFIX } from "utils/const/actionTypeAffixes";
import Posts from "components/Posts";
import WithSpinner from "components/WithSpinner";
import { defaultProps, propTypes } from "./Home.props";
import { fetchPostsStart } from "redux/posts/posts.actions";
import { selectCount, selectCurrentPage } from "redux/postsPaging/postsPaging.selectors";
import { selectPosts } from "redux/posts/posts.selectors";
import { selectRelevantPendingAction } from "redux/ui/ui.selectors";

Home.defaultProps = defaultProps;
Home.propTypes = propTypes;

function Home ({
    currentPostsPage,
    isPending,
    match,
    onFetchPostsStart,
    posts,
    postsOnPageCount
}) {
    const pageNumber = match.params.number || currentPostsPage;

    useEffect(() => {
        onFetchPostsStart({
            count: postsOnPageCount,
            page: pageNumber
        });
    }, [onFetchPostsStart, pageNumber, postsOnPageCount]);

    const propsFromHome = {
        isPending,
        posts
    };

    const HomeWithSpinner = WithSpinner(
        Posts,
        propsFromHome
    );

    return <HomeWithSpinner />;
}

const mapStateToProps = () => {
    return (state) => ({
        currentPostsPage: selectCurrentPage(state),
        isPending: Boolean(selectRelevantPendingAction(state, POSTS_PREFIX)),
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
