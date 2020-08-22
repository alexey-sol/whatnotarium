import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ProfileContent from "./ProfileContent.component";
import { defaultProps, propTypes } from "./ProfileContent.container.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectUpdatedProfile } from "redux/user/user.selectors";
import { setCurrentUser } from "redux/session/session.actions";
import { updateProfileReset } from "redux/user/user.actions";

ProfileContentContainer.defaultProps = defaultProps;
ProfileContentContainer.propTypes = propTypes;

function ProfileContentContainer ({
    currentUser,
    onSetCurrentUser,
    updatedProfile
}) {
    const newProfile = updatedProfile.item;

    useEffect(() => {
        if (newProfile) {
            onSetCurrentUser(newProfile);
        }
    }, [onSetCurrentUser, newProfile]);

    return <ProfileContent currentUser={currentUser} />;
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    updatedProfile: selectUpdatedProfile
});

const mapDispatchToProps = (dispatch) => ({
    onSetCurrentUser: (props) => dispatch(setCurrentUser(props)),
    onUpdatedProfileReset: () => dispatch(updateProfileReset())
});

const ConnectedProfileContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileContentContainer);

export default ConnectedProfileContent;
