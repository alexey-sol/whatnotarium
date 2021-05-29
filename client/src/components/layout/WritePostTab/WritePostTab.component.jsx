import { Link, withRouter } from "react-router-dom";
import React from "react";
import { matchPath } from "react-router";

import { DRAFT } from "utils/const/pathnames";
import { RESET_POST } from "utils/const/events";
import { propTypes } from "./WritePostTab.props";
import pubsub from "utils/pubsub";

WritePostButton.propTypes = propTypes;

function WritePostButton ({ classNameProminent, location }) {
    const match = matchPath(location.pathname, {
        path: `/${DRAFT}`,
        exact: true,
        strict: false
    });

    const resetPost = () => pubsub.publish(RESET_POST);

    const startOverTab = (
        <a // eslint-disable-line
            className={classNameProminent}
            onClick={resetPost}
            title="Начать сначала"
        >
            Начать сначала
        </a>
    );

    const writeNewPostTab = (
        <Link
            title="Написать статью"
            to={`/${DRAFT}`}
        >
            Написать статью
        </Link>
    );

    return (match)
        ? startOverTab
        : writeNewPostTab;
}

export default withRouter(WritePostButton);
