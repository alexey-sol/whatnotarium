import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { propTypes } from "./Activity.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import styles from "./Activity.module.scss";

Activity.propTypes = propTypes;

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