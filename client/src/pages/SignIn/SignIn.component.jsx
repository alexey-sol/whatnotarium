import React, { useState } from "react";

import SignInContent from "components/SignInContent";
import SignUpDialog from "components/common/Dialog/SignUpDialog";
import styles from "./SignIn.module.scss";

function Home () {
    const [signUpDialogIsShown, setSignUpDialogIsShown] = useState(false);

    return (
        <div className={styles.container}>
            <SignInContent
                showSignUpDialog={() => setSignUpDialogIsShown(true)}
            />

            {signUpDialogIsShown && <SignUpDialog
                onClose={() => setSignUpDialogIsShown(false)}
            />}
        </div>
    );
}

export default Home;
