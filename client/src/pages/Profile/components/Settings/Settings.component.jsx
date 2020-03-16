import React from "react";

import PasswordDataForm from "components/PasswordDataForm";
import ProfileDataForm from "components/ProfileDataForm";
import styles from "./Settings.module.scss";

function Settings () {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <div className={styles.formContainer}>
                    <ProfileDataForm />
                </div>

                <div className={styles.formContainer}>
                    <PasswordDataForm />
                </div>
            </div>
        </div>
    );
}

export default Settings;
