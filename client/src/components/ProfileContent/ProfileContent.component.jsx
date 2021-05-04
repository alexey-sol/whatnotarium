import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import classnames from "classnames";

import * as p from "utils/const/pathnames";
import { ACTIVITY, MY_POSTS, SETTINGS } from "utils/const/profileTabNames";
import { POSTS_PREFIX } from "utils/const/actionTypeAffixes";
import CustomLink from "components/CustomLink";
import Spinner from "components/Spinner";
import { defaultProps, propTypes } from "./ProfileContent.component.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectRelevantPendingAction } from "redux/ui/ui.selectors";
import styles from "./ProfileContent.module.scss";

ProfileContent.propTypes = propTypes;
ProfileContent.defaultProps = defaultProps;

function ProfileContent ({ activeTabName, children, isPending }) {
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
                {renderTab(ACTIVITY, `/${p.PROFILE}/${p.ACTIVITY}`)}
                {renderTab(MY_POSTS, `/${p.PROFILE}/${p.MY_POSTS}`)}
                {renderTab(SETTINGS, `/${p.PROFILE}/${p.SETTINGS}`)}
            </ul>

            <div className={styles.tabContent}>
                {(isPending)
                    ? <Spinner />
                    : children}
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isPending: (state) => Boolean(selectRelevantPendingAction(state, {
        actionPrefix: POSTS_PREFIX
    }))
});

const ConnectedProfileContent = connect(
    mapStateToProps
)(ProfileContent);

export default ConnectedProfileContent;
