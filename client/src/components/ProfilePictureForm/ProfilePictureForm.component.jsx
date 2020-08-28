import React, { useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { AvatarPlaceholder } from "components/Icon";
import { CloseIconButton } from "components/IconButton";
import { defaultProps, propTypes } from "./ProfilePictureForm.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectIsPending } from "redux/users/users.selectors";
import { updateUserStart } from "redux/users/users.actions";
import Tooltip from "components/Tooltip";
import styles from "./ProfilePictureForm.module.scss";

ProfilePictureForm.defaultProps = defaultProps;
ProfilePictureForm.propTypes = propTypes;

function ProfilePictureForm ({ currentUser, isPending, onUpdateUserStart }) {
    const fileInputRef = useRef(null);
    const pictureContainerRef = useRef(null);

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

        onUpdateUserStart({
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
    isPending: selectIsPending
});

const mapDispatchToProps = (dispatch) => ({
    onUpdateUserStart: (props) => dispatch(updateUserStart(props))
});

const ConnectedProfilePictureForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePictureForm);

export default ConnectedProfilePictureForm;
