import React from "react";
import classnames from "classnames";

import { SETTINGS } from "utils/const/profileTabNames";
import PasswordDataForm from "components/PasswordDataForm";
import ProfileContent from "components/ProfileContent";
import ProfileDataForm from "components/ProfileDataForm";
import ProfilePictureForm from "components/ProfilePictureForm";
import styles from "./Settings.module.scss";

function Settings () {
    return (
        <ProfileContent activeTabName={SETTINGS}>
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
        </ProfileContent>
    );
}

export default Settings;
