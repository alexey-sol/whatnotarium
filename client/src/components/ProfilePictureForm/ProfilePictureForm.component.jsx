import React, { useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { AvatarPlaceholder } from "components/Icon";
import { CloseIconButton } from "components/IconButton";
import { defaultProps, propTypes } from "./ProfilePictureForm.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectUpdatedProfile } from "redux/user/user.selectors";
import { updateProfileReset, updateProfileStart } from "redux/user/user.actions";
import Tooltip from "components/Tooltip";
import styles from "./ProfilePictureForm.module.scss";

ProfilePictureForm.defaultProps = defaultProps;
ProfilePictureForm.propTypes = propTypes;

function ProfilePictureForm ({
    currentUser,
    onUpdateProfileReset,
    onUpdateProfileStart,
    updatedProfile
}) {
    const fileInputRef = useRef(null);
    const pictureContainerRef = useRef(null);

    const { error, isPending } = updatedProfile; // clear error on unmount

    const { name, picture } = currentUser?.profile;

    const avatarImgElem = (
        <img
            alt={name}
            src={picture}
        />
    );

    const avatarPlaceholderElem = (
        <AvatarPlaceholder
            fill="#455a64"
            size={170}
        />
    );

    const handleChosenFile = ({ target }) => {
        const { files } = target;

        onUpdateProfileStart({
            picture: files[0]
        });
    };

    return null;

    return (
        <section className={styles.container}>
            <section
                className={styles.pictureContainer}
                onClick={() => fileInputRef?.current.click()}
                ref={pictureContainerRef}
            >
                {(currentUser?.picture)
                    ? avatarImgElem
                    : avatarPlaceholderElem}
            </section>

            <CloseIconButton
                className={styles.deleteButton}
                fill="#455a64"
                onClick={() => console.log("delete")}
                size={14}
                title="Удалить"
            />

            <Tooltip
                elemRef={pictureContainerRef}
                text="Изменить"
                width="small"
            />

            <input
                type="file"
                className={styles.hidden}
                ref={fileInputRef}
                onChange={handleChosenFile}
                accept="image/png, image/jpeg, image/jpg"
            />
        </section>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    updatedProfile: selectUpdatedProfile
});

const mapDispatchToProps = (dispatch) => ({
    onUpdateProfileReset: () => dispatch(updateProfileReset()),
    onUpdateProfileStart: (props) => dispatch(updateProfileStart(props))
});

const ConnectedProfilePictureForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePictureForm);

export default ConnectedProfilePictureForm;
