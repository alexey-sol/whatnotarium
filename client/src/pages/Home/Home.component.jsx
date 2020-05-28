import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Posts from "components/Posts";
import { defaultProps, propTypes } from "./Home.props";
import { getPostsStart } from "redux/post/post.actions";
import { selectPosts } from "redux/post/post.selectors";
// import styles from "./Home.module.scss";

Home.defaultProps = defaultProps;
Home.propTypes = propTypes;

function Home ({ onGetPostsStart, posts }) {
    useEffect(() => {
        onGetPostsStart();
    }, []);

    return (
        <div>
            <Posts posts={posts} />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    posts: selectPosts
});

const mapDispatchToProps = (dispatch) => ({
    onGetPostsStart: () => dispatch(getPostsStart())
});

const ConnectedHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default ConnectedHome;
