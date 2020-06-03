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
    const postIsDeleted = Boolean(deletedPost.item);
    const profileIsUpdated = Boolean(newProfile);

    const clearStateIfNeeded = useCallback(() => {
        if (postIsDeleted) onDeletePostReset();
        if (profileIsUpdated) onUpdatedProfileReset();
    }, [postIsDeleted, profileIsUpdated, onDeletePostReset, onUpdatedProfileReset]);

    useEffect(() => {
        if (newProfile) {
            onSetCurrentUser(newProfile);
        }

        return () => {
            clearStateIfNeeded();
        };
    }, [clearStateIfNeeded, onSetCurrentUser, newProfile]);

    const popupText = (modifiedItem.item)
        ? "Сохранено"
        : modifiedItem.error?.message;

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
