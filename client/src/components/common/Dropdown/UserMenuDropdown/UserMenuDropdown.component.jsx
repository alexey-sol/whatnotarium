import React from "react";

import { propTypes } from "../Dropdown.props";
import BaseDropdown from "components/BaseDropdown";
import styles from "./UserMenuDropdown.module.scss";

UserMenuDropdown.propTypes = propTypes;

function UserMenuDropdown ({ elementRef, onClose }) {
    return (
        <BaseDropdown
            elementRef={elementRef}
            isFixed
            onClose={onClose}
        >
            <ul className={styles.list}>
                <li className={styles.item}>
                    Профиль 1asdasd asdasd
                </li>

                <li className={styles.item}>
                    Выйти
                </li>
            </ul>
        </BaseDropdown>
    );
}

export default UserMenuDropdown;
