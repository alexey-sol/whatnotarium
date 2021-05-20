import React, { useCallback, useState } from "react";

import { ForgotPasswordDialog } from "components/ui/Dialog";
import SignInContent from "components/forms/SignInContent";
import SignUpDialog from "components/ui/Dialog/SignUpDialog";
import styles from "./SignIn.module.scss";

function Home () {
    const [signUpIsShown, setSignUpIsShown] = useState(false);
    const [forgotPassIsShown, setForgotPassIsShown] = useState(false);

    const hideForgotPass = useCallback(() => setForgotPassIsShown(false), []);
    const showForgotPass = useCallback(() => setForgotPassIsShown(true), []);

    return (
        <div className={styles.container}>
            <SignInContent
                showForgotPass={showForgotPass}
                showSignUp={() => setSignUpIsShown(true)}
            />

            {signUpIsShown && (
                <SignUpDialog onClose={() => setSignUpIsShown(false)} />
            )}

            {forgotPassIsShown && (
                <ForgotPasswordDialog onClose={hideForgotPass} />
            )}
        </div>
    );
}

export default Home;
