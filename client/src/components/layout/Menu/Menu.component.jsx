import React, {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

import ActionsMenu from "components/layout/ActionsMenu";
import Navbar from "components/layout/Navbar";
import UserMenuDropdown from "components/layout/UserMenuDropdown";
import styles from "./Menu.module.scss";

function Menu () {
    const menuRef = useRef(null);

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

    const renderCommonMenu = () => (
        <section className={styles.commonMenu} ref={menuRef}>
            <ActionsMenu showUserMenu={showUserMenu} />
            <Navbar />
        </section>
    );

    return (
        <section
            className={styles.container}
            style={positionStyle}
        >
            <div className={styles.content}>
                {renderCommonMenu()}

                {userMenuIsShown && (
                    <UserMenuDropdown
                        elemRef={menuRef}
                        isVisible={userMenuIsShown}
                        onClose={hideUserMenu}
                    />
                )}
            </div>
        </section>
    );
}

export default Menu;
