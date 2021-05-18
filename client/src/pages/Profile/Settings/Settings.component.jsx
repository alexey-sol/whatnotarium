import React from "react";
import classnames from "classnames";

import { SETTINGS } from "utils/const/profileTabNames";
import PasswordDataForm from "components/profile/PasswordDataForm";
import ProfileContent from "components/profile/ProfileContent";
import ProfileDataForm from "components/profile/ProfileDataForm";
import ProfilePictureForm from "components/profile/ProfilePictureForm";
import styles from "./Settings.module.scss";

function Settings () {
    return (
        <ProfileContent activeTabName={SETTINGS}>
            <section className={styles.container}>
                <section className={styles.forms}>
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
                </section>
            </section>
        </ProfileContent>
    );
}

export default Settings;
