import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ProfileContent from "./ProfileContent.component";
import { defaultProps, propTypes } from "./ProfileContent.container.props";
import { deletePostReset } from "redux/post/post.actions";
import { selectDeletedPost } from "redux/post/post.selectors";
import { selectUpdatedProfile } from "redux/user/user.selectors";
import { setCurrentUser } from "redux/session/session.actions";
import { updateProfileReset } from "redux/user/user.actions";
import findModifiedStateItem from "utils/redux/findModifiedStateItem";
import translateError from "utils/helpers/translateError";

ProfileContentContainer.defaultProps = defaultProps;
ProfileContentContainer.propTypes = propTypes;

function ProfileContentContainer ({
    deletedPost,
    onDeletePostReset,
    onSetCurrentUser,
    onUpdatedProfileReset,
    updatedProfile
}) {
    const modifiedItem = findModifiedStateItem(deletedPost, updatedProfile);
    const newProfile = updatedProfile.item;

    const shouldResetDeletedPost = deletedPost.item;
    const shouldResetUpdatedProfile = newProfile || updatedProfile.error;

    // TODO: resetting is called twice. Fix it (component gets rerendered on
    // update user even if there's nothing to update).
    const clearStateIfNeeded = useCallback(() => {
        if (shouldResetDeletedPost) onDeletePostReset();
        if (shouldResetUpdatedProfile) onUpdatedProfileReset();
    }, [
        shouldResetDeletedPost,
        shouldResetUpdatedProfile,
        onDeletePostReset,
        onUpdatedProfileReset
    ]);

    useEffect(() => {
        if (newProfile) {
            onSetCurrentUser(newProfile);
        }

        return () => {
            clearStateIfNeeded();
        };
    }, [clearStateIfNeeded, onSetCurrentUser, newProfile]);

    const outOfFieldsError = translateError(modifiedItem.error);

    const popupText = (modifiedItem.item)
        ? "Сохранено"
        : outOfFieldsError;

    const popupTheme = (modifiedItem.item)
        ? "success"
        : "error";

    return (
        <ProfileContent
            hidePopup={clearStateIfNeeded}
            popupText={popupText}
            popupTheme={popupTheme}
        />
    );
}

const mapStateToProps = createStructuredSelector({
    deletedPost: selectDeletedPost,
    updatedProfile: selectUpdatedProfile
});

const mapDispatchToProps = (dispatch) => ({
    onDeletePostReset: () => dispatch(deletePostReset()),
    onSetCurrentUser: (props) => dispatch(setCurrentUser(props)),
    onUpdatedProfileReset: () => dispatch(updateProfileReset())
});

const ConnectedProfileContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileContentContainer);

export default ConnectedProfileContent;
