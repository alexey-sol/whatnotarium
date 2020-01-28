import React, { memo, useEffect } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";

import { CloseIconButton } from "components/common/IconButton";
import { defaultProps, propTypes } from "./BaseDialog.props";
import styles from "./BaseDialog.module.scss";

BaseDialog.propTypes = propTypes;
BaseDialog.defaultProps = defaultProps;

function BaseDialog ({ children, className, onClose }) {
    const rootElement = document.getElementById("root");

    const dialogElement = (
        <div
            className={styles.root}
            onClick={onClose}
        >
            <div
                className={classnames(styles.container, className)}
                onClick={event => event.stopPropagation()}
            >
                <CloseIconButton
                    className={styles.closeIconButton}
                    onClick={onClose}
                />

                <div className={styles.content}>
                    { children }
                </div>
            </div>
        </div>
    );

    const onKeydown = (event) => {
        if (event.key === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", onKeydown);
        return () => document.removeEventListener("keydown", onKeydown);
    }, [children]);

    return ReactDOM.createPortal(
        dialogElement,
        rootElement
    );
}

export default memo(BaseDialog);
