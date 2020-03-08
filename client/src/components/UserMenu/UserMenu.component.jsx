import { Link } from "react-router-dom";
import React, { useEffect } from "react";

import { propTypes } from "./UserMenu.props";
import { BackIconButton } from "components/common/IconButton";
import styles from "./UserMenu.module.scss";

UserMenu.propTypes = propTypes;

function UserMenu ({ onClose }) {
    useEffect(() => {
        const onKeydown = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKeydown);
        return () => document.removeEventListener("keydown", onKeydown);
    }, [onClose]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <BackIconButton onClick={onClose} />
            </div>

            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link
                        // title="Заметки"
                        // to="/notes"
                    >
                        Профиль
                    </Link>
                </li>

                <li className={styles.item}>
                    <Link
                        // title="Выйти"
                        // to="/notes"
                    >
                        Выйти
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default UserMenu;
