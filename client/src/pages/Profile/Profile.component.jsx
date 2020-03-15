import React, { useState } from "react";
import classnames from "classnames";

import Activity from "./components/Activity";
import MyArticles from "./components/MyArticles";
import MyNotes from "./components/MyNotes";
import Settings from "./components/Settings";
import styles from "./Profile.module.scss";

const tabNames = [
    "Активность",
    "Мои статьи",
    "Мои заметки",
    "Настройки"
];

function Profile () {
    const [currentTab, setCurrentTab] = useState(tabNames[0]);

    const tabs = tabNames.map((tabName, index) => (
        <li
            className={classnames(
                styles.tab,
                (tabName === currentTab) ? styles.active : ""
            )}
            key={index}
            onClick={() => setCurrentTab(tabName)}
        >
            <span className={styles.tabTitle}>
                {tabName}
            </span>
        </li>
    ));

    const tabIsActivity = currentTab === tabNames[0];
    const tabIsMyArticles = currentTab === tabNames[1];
    const tabIsMyNotes = currentTab === tabNames[2];
    const tabIsSettings = currentTab === tabNames[3];

    return (
        <div className={styles.container}>
            <ul className={styles.tabsList}>
                {tabs}
            </ul>

            <div className={styles.tabContent}>
                {tabIsActivity && <Activity />}
                {tabIsMyArticles && <MyArticles />}
                {tabIsMyNotes && <MyNotes />}
                {tabIsSettings && <Settings />}
            </div>
        </div>
    );
}

export default Profile;
