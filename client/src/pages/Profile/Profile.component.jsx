import React from "react";

import ProfileContent from "components/ProfileContent";
import styles from "./Profile.module.scss";

function Profile () {
    return (
        <div className={styles.container}>
            <ProfileContent />
        </div>
    );
}

export default Profile;
