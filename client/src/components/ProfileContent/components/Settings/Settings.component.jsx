import React from "react";

import PasswordDataForm from "components/PasswordDataForm";
import ProfileDataForm from "components/ProfileDataForm";
import styles from "./Settings.module.scss";

function Settings () {
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
        </article>
    );
}

export default Settings;
