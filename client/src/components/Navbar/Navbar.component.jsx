import { Link } from "react-router-dom";
import React from "react";

import styles from "./Navbar.module.scss";

function Navbar () {
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link
                        title="Статьи"
                        to="/"
                    >
                        Статьи
                    </Link>
                </li>

                <li className={styles.item}>
                    <Link
                        title="Заметки"
                        to="/notes"
                    >
                        Заметки
                    </Link>
                </li>

                <li className={styles.item}>
                    <Link
                        title="Авторы"
                        to="/authors"
                    >
                        Авторы
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
