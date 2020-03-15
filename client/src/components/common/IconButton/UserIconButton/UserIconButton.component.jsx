import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { User as UserIcon } from "components/common/Icon";
import IconButton from "components/BaseIconButton";
import { defaultProps, propTypes } from "./UserIconButton.props";
import { selectCurrentUser } from "redux/user/user.selectors";

UserIconButton.propTypes = propTypes;
UserIconButton.defaultProps = defaultProps;

function UserIconButton ({ currentUser, onClick, ...rest }) {
    const userName = currentUser && currentUser.name;
    const title = userName || "Учетная запись";

    return (
        <IconButton
            {...rest}
            onClick={onClick}
            title={title}
        >
            <UserIcon />
        </IconButton>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const ConnectedUserIconButton = connect(
    mapStateToProps
)(UserIconButton);

export default ConnectedUserIconButton;
