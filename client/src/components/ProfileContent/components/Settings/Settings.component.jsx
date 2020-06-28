import React from "react";
import classnames from "classnames";

import PasswordDataForm from "components/PasswordDataForm";
import ProfileDataForm from "components/ProfileDataForm";
import ProfilePictureForm from "components/ProfilePictureForm";
import styles from "./Settings.module.scss";

function Settings () {
    return (
        <article className={styles.container}>
            <article className={styles.forms}>
                <section
                    className={classnames(
                        styles.formContainer,
                        styles.profileDataForm
                    )}
                >
                    <ProfileDataForm />
                </section>

                <section
                    className={classnames(
                        styles.formContainer,
                        styles.profilePictureForm
                    )}
                >
                    <ProfilePictureForm />
                </section>

                <section
                    className={classnames(
                        styles.formContainer,
                        styles.passwordDataForm
                    )}
                >
                    <PasswordDataForm />
                </section>
            </article>
        </article>
    );
}

export default Settings;
