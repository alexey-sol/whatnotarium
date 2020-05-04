import React, { useState } from "react";

import SignInContent from "components/SignInContent";
import SignUpDialog from "components/Dialog/SignUpDialog";
import styles from "./SignIn.module.scss";

function Home () {
    const [signUpIsShown, setSignUpIsShown] = useState(false);

    return (
        <div className={styles.container}>
            <SignInContent
                showSignUpDialog={() => setSignUpIsShown(true)}
            />

            {signUpIsShown && (
                <SignUpDialog
                    onClose={() => setSignUpIsShown(false)}
                />
            )}
        </div>
    );
}

export default Home;
