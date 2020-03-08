import React, { Fragment, useEffect, useState } from "react";

import ActionsMenu from "components/ActionsMenu";
import Navbar from "components/Navbar";
import UserMenu from "components/UserMenu";
import styles from "./Menu.module.scss";

function Menu () {
    const [scrollY, setScrollY] = useState(0);
    const [userMenuIsShown, setUserMenuIsShown] = useState(false);

    const positionStyle = {
        marginTop: `-${scrollY}px`
    };

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            const headerHeight = 50;

            const newScrollY = (y < headerHeight)
                ? y
                : headerHeight;

            setScrollY(newScrollY);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const renderUserMenu = () => (
        <UserMenu
            onClose={() => setUserMenuIsShown(false)}
        />
    );

    const renderCommonMenu = () => (
        <div className={styles.commonMenu}>
            <ActionsMenu showUserMenu={() => setUserMenuIsShown(true)} />
            <Navbar />
        </div>
    );

    return (
        <div
            className={styles.container}
            style={positionStyle}
        >
            {userMenuIsShown
                ? renderUserMenu()
                : renderCommonMenu()}
        </div>
    );
}

export default Menu;
