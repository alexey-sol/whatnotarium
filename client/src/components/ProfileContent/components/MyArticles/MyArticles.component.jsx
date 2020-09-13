import React from "react";
import { connect } from "react-redux";

import { defaultProps, propTypes } from "./MyArticles.props";
import { selectUserPosts } from "redux/posts/posts.selectors";
import Posts from "components/Posts";
import styles from "./MyArticles.module.scss";

MyArticles.defaultProps = defaultProps;
MyArticles.propTypes = propTypes;

function MyArticles ({ userPosts }) {
    return (
        <div className={styles.container}>
            <Posts posts={userPosts} />
        </div>
    );
}

const mapStateToProps = () => {
    return (state, ownProps) => ({
        userPosts: selectUserPosts(state, ownProps.currentUser.id) // TODO: maybe better to fetch posts?
    });
};

const ConnectedMyArticles = connect(
    mapStateToProps
)(MyArticles);

export default ConnectedMyArticles;
