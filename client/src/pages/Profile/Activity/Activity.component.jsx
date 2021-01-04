import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ACTIVITY } from "utils/const/profileTabNames";
import ProfileContent from "components/ProfileContent";
import { defaultProps, propTypes } from "./Activity.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import styles from "./Activity.module.scss";

Activity.defaultProps = defaultProps;
Activity.propTypes = propTypes;

function Activity ({ currentUser }) {
    return (
        <ProfileContent activeTabName={ACTIVITY}>
            <div className={styles.container}>
                Активность
            </div>
        </ProfileContent>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const ConnectedActivity = connect(
    mapStateToProps
)(Activity);

export default ConnectedActivity;
