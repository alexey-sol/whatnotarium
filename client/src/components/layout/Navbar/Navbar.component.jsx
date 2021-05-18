import React from "react";

import Logo from "components/layout/Logo";
import NavbarList from "components/layout/NavbarList";
import styles from "./Navbar.module.scss";

function Navbar () {
    return (
        <div className={styles.container}>
            <div className={styles.mobileLogo}>
                <Logo isMobileView />
            </div>

            <div className={styles.desktopNavbar}>
                <NavbarList />
            </div>
        </div>
    );
}

export default Navbar;
