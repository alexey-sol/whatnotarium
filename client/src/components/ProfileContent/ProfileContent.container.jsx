import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ProfileContent from "./ProfileContent.component";
import { propTypes } from "./ProfileContent.container.props";
import { selectCurrentUser } from "redux/session/session.selectors";

ProfileContentContainer.propTypes = propTypes;

function ProfileContentContainer ({ currentUser }) {
    return <ProfileContent currentUser={currentUser} />;
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const ConnectedProfileContent = connect(
    mapStateToProps
)(ProfileContentContainer);

export default ConnectedProfileContent;
