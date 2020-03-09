import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { BackIconButton } from "components/common/IconButton";
import { signOutStart } from "redux/user/user.actions";
import { propTypes } from "./UserMenu.props";
import styles from "./UserMenu.module.scss";

UserMenu.propTypes = propTypes;

function UserMenu ({ history, onClose, signOutStart }) {
    const containerRef = useRef(null);

    const redirectToProfile = () => {
        history.push("/profile");
        onClose();
    };

    const signOut = () => {
        signOutStart();
        onClose();
    };

    useEffect(() => {
        const onKeydown = (event) => {
            if (event.key === "Escape") onClose();
        };

        const onMousedown = ({ target }) => {
            const container = containerRef.current;
            const shouldCloseUserMenu = container &&
                !container.contains(target);

            if (shouldCloseUserMenu) onClose();
        };

        document.addEventListener("keydown", onKeydown);
        document.addEventListener("mousedown", onMousedown);

        return () => {
            document.removeEventListener("keydown", onKeydown);
            document.removeEventListener("mousedown", onMousedown);
        };
    }, [onClose]);

    return (
        <div
            className={styles.container}
            ref={containerRef}
        >
            <div className={styles.header}>
                <BackIconButton onClick={onClose} />
            </div>

            <ul className={styles.list}>
                <li
                    className={styles.item}
                    onClick={redirectToProfile}
                >
                    <span>
                        Профиль
                    </span>
                </li>

                <li
                    className={styles.item}
                    onClick={signOut}
                >
                    <span>
                        Выйти из аккаунта
                    </span>
                </li>
            </ul>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    signOutStart: () => dispatch(signOutStart())
});

const ConnectedUserMenu = connect(
    null,
    mapDispatchToProps
)(UserMenu);

export default withRouter(ConnectedUserMenu);
