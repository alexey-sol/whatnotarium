import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ProfileContent from "./ProfileContent.component";
import { defaultProps, propTypes } from "./ProfileContent.container.props";
import { deletePostReset } from "redux/post/post.actions";
import { selectDeletedPost } from "redux/post/post.selectors";

ProfileContentContainer.defaultProps = defaultProps;
ProfileContentContainer.propTypes = propTypes;

function ProfileContentContainer ({ deletedPost, onDeletePostReset }) {
    const didDeletionSucceed = Boolean(deletedPost.item);

    const clearStorageIfNeeded = useCallback(() => {
        if (didDeletionSucceed) onDeletePostReset();
    }, [didDeletionSucceed, onDeletePostReset]);

    const popupText = (deletedPost.item)
        ? "Сохранено"
        : deletedPost.error?.message;

    const popupTheme = (deletedPost.item)
        ? "success"
        : "error";

    useEffect(() => {
        return () => {
            clearStorageIfNeeded();
        };
    }, [clearStorageIfNeeded]);

    return (
        <ProfileContent
            hidePopup={clearStorageIfNeeded}
            popupText={popupText}
            popupTheme={popupTheme}
        />
    );
}

const mapStateToProps = createStructuredSelector({
    deletedPost: selectDeletedPost
});

const mapDispatchToProps = (dispatch) => ({
    onDeletePostReset: () => dispatch(deletePostReset())
});

const ConnectedProfileContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileContentContainer);

export default ConnectedProfileContent;
