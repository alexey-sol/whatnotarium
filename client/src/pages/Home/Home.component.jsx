import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Posts from "components/Posts";
import Spinner from "components/Spinner";
import { defaultProps, propTypes } from "./Home.props";
import { getPostsStart } from "redux/post/post.actions";
import { selectGottenPosts } from "redux/post/post.selectors";
import { selectGottenPostsPending } from "redux/pending/pending.selectors";
import styles from "./Home.module.scss";

Home.defaultProps = defaultProps;
Home.propTypes = propTypes;

function Home ({ onGetPostsStart, posts, postsPending }) {
    useEffect(() => {
        onGetPostsStart();
    }, [onGetPostsStart]);

    const { pending } = postsPending;

    return (
        <div>
            {pending
                ? <Spinner />
                : <Posts posts={posts} />}
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    posts: selectGottenPosts,
    postsPending: selectGottenPostsPending
});

const mapDispatchToProps = (dispatch) => ({
    onGetPostsStart: () => dispatch(getPostsStart())
});

const ConnectedHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default ConnectedHome;
