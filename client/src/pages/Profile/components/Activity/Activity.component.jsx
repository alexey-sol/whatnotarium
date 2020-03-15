import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { defaultProps, propTypes } from "./Activity.props";
import { selectCurrentUser } from "redux/user/user.selectors";
import styles from "./Activity.module.scss";

Activity.propTypes = propTypes;
Activity.defaultProps = defaultProps;

function Activity ({ currentUser }) {
    return (
        <div className={styles.container}>
            Активность
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const ConnectedActivity = connect(
    mapStateToProps
)(Activity);

export default ConnectedActivity;
