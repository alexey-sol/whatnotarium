import React, { useRef } from "react";
import { connect } from "react-redux";

import { CloseIconButton } from "components/IconButton";
import { UserPicturePlaceholder } from "components/Icon";
import { USERS_PREFIX } from "utils/const/actionTypeAffixes";
import Tooltip from "components/Tooltip";
import { defaultProps, propTypes } from "./ProfilePictureForm.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { updateUserPictureStart } from "redux/users/users.actions";
import styles from "./ProfilePictureForm.module.scss";
import toBase64 from "utils/helpers/toBase64";

ProfilePictureForm.defaultProps = defaultProps;
ProfilePictureForm.propTypes = propTypes;

function ProfilePictureForm ({
    currentUser,
    isPending,
    onUpdateUserPictureStart
}) {
    const fileInputRef = useRef(null);
    const pictureContainerRef = useRef(null);

    const { id } = currentUser;
    const { name, picture } = currentUser?.profile;

    const picDataIfAny = (picture)
        ? `data:image/jpeg;base64,${toBase64(picture.data)}`
        : null;

    const avatarImgElem = (
        <img
            alt={name}
            src={picDataIfAny}
        />
    );

    const avatarPlaceholderElem = (
        <UserPicturePlaceholder
            fill="#455a64"
            size={170}
        />
    );

    const handleChosenFile = ({ target }) => {
        const file = target.files?.[0];

        if (file) {
            onUpdateUserPictureStart({
                id,
                picture: file
            });
        }
    };

    return (
        <section className={styles.container}>
            <section
                className={styles.pictureContainer}
                onClick={() => fileInputRef.current?.click()}
                ref={pictureContainerRef}
            >
                {(picture)
                    ? avatarImgElem
                    : avatarPlaceholderElem}
            </section>

            {picture && (
                <CloseIconButton
                    className={styles.deleteButton}
                    fill="#455a64"
                    onClick={() => onUpdateUserPictureStart({ id, picture: null })}
                    size={14}
                    title="Удалить фото"
                />
            )}

            <Tooltip
                elemRef={pictureContainerRef}
                text="Залить новое фото"
                width="small"
            />

            <input
                accept="image/png, image/jpeg, image/jpg"
                className={styles.hidden}
                name="picture"
                onInput={handleChosenFile}
                ref={fileInputRef}
                type="file"
            />
        </section>
    );
}

const mapStateToProps = () => {
    return (state) => ({
        currentUser: selectCurrentUser(state),
        isPending: Boolean(selectRelevantPendingAction(state, USERS_PREFIX))
    });
};

const mapDispatchToProps = (dispatch) => ({
    onUpdateUserPictureStart: (props) => dispatch(updateUserPictureStart(props))
});

const ConnectedProfilePictureForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePictureForm);

export default ConnectedProfilePictureForm;
