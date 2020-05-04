import React, { useCallback, useEffect, useState } from "react";

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
            const headerHeight = 40;

            const newScrollY = (y < headerHeight)
                ? y
                : headerHeight;

            setScrollY(newScrollY);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const hideUserMenu = useCallback(() => setUserMenuIsShown(false), []);
    const showUserMenu = useCallback(() => setUserMenuIsShown(true), []);

    const renderUserMenu = () => (
        <UserMenu onClose={hideUserMenu} />
    );

    const renderCommonMenu = () => (
        <div className={styles.commonMenu}>
            <ActionsMenu showUserMenu={showUserMenu} />
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
