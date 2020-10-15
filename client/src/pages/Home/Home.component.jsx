import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Posts from "components/Posts";
import WithSpinner from "components/WithSpinner";
import { defaultProps, propTypes } from "./Home.props";
import { fetchPostsStart } from "redux/posts/posts.actions";
import { selectCount, selectCurrentPage } from "redux/postsPaging/postsPaging.selectors";
import { selectIsPending, selectPosts } from "redux/posts/posts.selectors";

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

const mapStateToProps = createStructuredSelector({
    currentPostsPage: selectCurrentPage,
    isPending: selectIsPending,
    posts: selectPosts,
    postsOnPageCount: selectCount
});

const mapDispatchToProps = (dispatch) => ({
    onFetchPostsStart: (options) => dispatch(fetchPostsStart(options))
});

const ConnectedHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default ConnectedHome;
