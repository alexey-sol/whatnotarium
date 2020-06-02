import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Posts from "components/Posts";
import Spinner from "components/Spinner";
import { defaultProps, propTypes } from "./Home.props";
import { fetchPostsStart } from "redux/post/post.actions";
import { selectFetchedPosts, selectPosts } from "redux/post/post.selectors";

Home.defaultProps = defaultProps;
Home.propTypes = propTypes;

function Home ({ fetchedPosts, onFetchPostsStart, posts }) {
    useEffect(() => {
        // onFetchPostsStart(); // TODO: didInvalidate checking or sth?
    }, []);

    const { isFetching } = fetchedPosts;
    const postsArray = Object.values(posts);

    // TODO: error on fetching?

    return (
        <div>
            {isFetching
                ? <Spinner />
                : <Posts posts={postsArray} />}
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    fetchedPosts: selectFetchedPosts,
    posts: selectPosts
});

const mapDispatchToProps = (dispatch) => ({
    onFetchPostsStart: () => dispatch(fetchPostsStart())
});

const ConnectedHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default ConnectedHome;
