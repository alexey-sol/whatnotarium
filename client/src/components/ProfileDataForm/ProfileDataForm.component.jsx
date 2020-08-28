import { Form, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { EMAIL, NAME } from "utils/const/userData";
import { HIDE_NOTIFICATION } from "../../utils/const/events";
import BaseButton from "components/BaseButton";
import FormInput from "../FormInput";
import { defaultProps, propTypes } from "./ProfileDataForm.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectIsPending } from "redux/users/users.selectors";
import { selectNotification } from "../../redux/ui/ui.selectors";
import { updateUserStart } from "redux/users/users.actions";
import pubsub from "../../utils/pubsub";
import styles from "./ProfileDataForm.module.scss";
import updateProfileSchema from "../../utils/validators/shemas/updateProfile";

ProfileDataForm.defaultProps = defaultProps;
ProfileDataForm.propTypes = propTypes;

function ProfileDataForm ({
    currentUser,
    isPending,
    notification,
    onUpdateUserStart
}) {
    const initialValues = {
        email: currentUser.email,
        id: currentUser.id,
        name: currentUser.profile.name
    };

    const handleChangeWrapper = (event, cb) => {
        if (notification) {
            pubsub.publish(HIDE_NOTIFICATION);
        }

        cb(event);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onUpdateUserStart}
            validateOnChange
            validationSchema={updateProfileSchema}
        >
            {({ errors, handleChange }) => (
                <Form className={styles.container}>
                    <FormInput
                        label="Имя"
                        name={NAME}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                        type="text"
                    />

                    <FormInput
                        hasFixedTooltip
                        label="Email"
                        name={EMAIL}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                        type="email"
                    />

                    <BaseButton
                        className={styles.updateProfileDataButton}
                        disabled={isPending || Object.keys(errors).length > 0}
                        text="Сохранить"
                        theme="dark"
                    />
                </Form>
            )}
        </Formik>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isPending: selectIsPending,
    notification: selectNotification
});

const mapDispatchToProps = (dispatch) => ({
    onUpdateUserStart: (props) => dispatch(updateUserStart(props))
});

const ConnectedProfileDataForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileDataForm);

export default ConnectedProfileDataForm;
