import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import PasswordDataForm from "components/PasswordDataForm";
import Popup from "components/Popup";
import ProfileDataForm from "components/ProfileDataForm";
import { defaultProps, propTypes } from "./Settings.props";
import { selectCurrentUser } from "redux/session/session.selectors";

import {
    selectUpdatedProfile,
    selectUpdatedProfileError
} from "redux/user/user.selectors";

import { setCurrentUser } from "redux/session/session.actions";
import { updateProfileReset, updateProfileStart } from "redux/user/user.actions";
import styles from "./Settings.module.scss";

Settings.defaultProps = defaultProps;
Settings.propTypes = propTypes;

function Settings ({
    currentUser,
    onSetCurrentUser,
    onUpdateProfileReset,
    updatedProfile,
    updatedProfileError
}) {
    const [failedUpdateIsShown, setFailedUpdateIsShown] = useState(false);
    const [successfulUpdateIsShown, setSuccessfulUpdateIsShown] = useState(false);

    const shouldUpdateCurrentUser = Boolean(
        updatedProfile &&
        !_.isEqual(currentUser, updatedProfile)
    );

    useEffect(() => {
        if (shouldUpdateCurrentUser) {
            onSetCurrentUser(updatedProfile);
        }

        return () => onUpdateProfileReset();
    }, [
        onSetCurrentUser,
        onUpdateProfileReset,
        shouldUpdateCurrentUser,
        updatedProfile
    ]);

    useEffect(() => {
        if (updatedProfile) {
            setSuccessfulUpdateIsShown(true);
        } else if (updatedProfileError) {
            setFailedUpdateIsShown(true);
        }
    }, [updatedProfile, updatedProfileError]);

    return (
        <article className={styles.container}>
            <article className={styles.forms}>
                <section className={styles.formContainer}>
                    <ProfileDataForm />
                </section>

                <section className={styles.formContainer}>
                    <PasswordDataForm />
                </section>
            </article>

            {failedUpdateIsShown && (
                <Popup
                    onClose={() => setFailedUpdateIsShown(false)}
                    text="Ошибка при сохранении профиля"
                    theme="error"
                />
            )}

            {successfulUpdateIsShown && (
                <Popup
                    onClose={() => setSuccessfulUpdateIsShown(false)}
                    text="Профиль успешно сохранен"
                    theme="success"
                />
            )}
        </article>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    updatedProfile: selectUpdatedProfile,
    updatedProfileError: selectUpdatedProfileError
});

const mapDispatchToProps = (dispatch) => ({
    onSetCurrentUser: (props) => dispatch(setCurrentUser(props)),
    onUpdateProfileReset: () => dispatch(updateProfileReset()),
    onUpdateProfileStart: (props) => dispatch(updateProfileStart(props))
});

const ConnectedSettings = connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);

export default ConnectedSettings;
