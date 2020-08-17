import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { defaultProps, propTypes } from "./MyArticles.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectPosts } from "redux/posts/posts.selectors";
import Posts from "components/Posts";
import styles from "./MyArticles.module.scss";

MyArticles.defaultProps = defaultProps;
MyArticles.propTypes = propTypes;

function MyArticles ({ currentUser, posts }) {
    const userPosts = _.pickBy(posts, ({ userId }) => {
        return userId === currentUser.id;
    });

    return (
        <div className={styles.container}>
            <Posts posts={Object.values(userPosts)} />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    posts: selectPosts
});

const ConnectedMyArticles = connect(
    mapStateToProps
)(MyArticles);

export default ConnectedMyArticles;
