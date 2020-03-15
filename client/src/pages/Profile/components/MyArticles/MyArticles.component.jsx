import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { defaultProps, propTypes } from "./MyArticles.props";
import { selectCurrentUser } from "redux/user/user.selectors";
import styles from "./MyArticles.module.scss";

MyArticles.propTypes = propTypes;
MyArticles.defaultProps = defaultProps;

function MyArticles ({ currentUser }) {
    return (
        <div className={styles.container}>
            Мои статьи
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
