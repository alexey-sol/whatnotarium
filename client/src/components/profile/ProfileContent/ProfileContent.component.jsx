import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import classnames from "classnames";

import * as p from "utils/const/pathnames";
import { MY_POSTS, SETTINGS } from "utils/const/profileTabNames";
import CustomLink from "components/ui/CustomLink";
import { defaultProps, propTypes } from "./ProfileContent.component.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import styles from "./ProfileContent.module.scss";

ProfileContent.propTypes = propTypes;
ProfileContent.defaultProps = defaultProps;

function ProfileContent ({ activeTabName, children }) {
    const renderTab = (tabName, path) => (
        <li
            className={classnames(styles.tab, (tabName === activeTabName) ? styles.active : "")}
            key={path}
        >
            <CustomLink to={path}>
                {tabName}
            </CustomLink>
        </li>
    );

    return (
        <div className={styles.container}>
            <ul className={styles.tabsList}>
                {renderTab(MY_POSTS, `/${p.PROFILE}/${p.MY_POSTS}`)}
                {renderTab(SETTINGS, `/${p.PROFILE}/${p.SETTINGS}`)}
            </ul>

            <div className={styles.tabContent}>
                {children}
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const ConnectedProfileContent = connect(
    mapStateToProps
)(ProfileContent);

export default ConnectedProfileContent;
