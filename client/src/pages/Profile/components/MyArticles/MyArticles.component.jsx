import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { defaultProps, propTypes } from "./MyArticles.props";
import { selectCurrentUser } from "redux/user/user.selectors";
import Posts from "components/Posts";
import styles from "./MyArticles.module.scss";

MyArticles.defaultProps = defaultProps;
MyArticles.propTypes = propTypes;

function MyArticles ({ currentUser }) {
    return (
        <div className={styles.container}>
            <Posts />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const ConnectedMyArticles = connect(
    mapStateToProps
)(MyArticles);

export default ConnectedMyArticles;
