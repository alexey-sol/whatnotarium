import React from "react";

import styles from "./Menu.module.scss";

function Menu () {
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                <li>
                    Статьи
                </li>

                <li>
                    Заметки
                </li>

                <li>
                    Авторы
                </li>
            </ul>
        </div>
    );
}

export default Menu;
