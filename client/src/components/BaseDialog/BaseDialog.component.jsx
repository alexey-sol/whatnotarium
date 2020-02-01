import React, { memo, useEffect } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";

import { defaultProps, propTypes } from "./BaseDialog.props";
import { CloseIconButton } from "components/common/IconButton";
import styles from "./BaseDialog.module.scss";

BaseDialog.propTypes = propTypes;
BaseDialog.defaultProps = defaultProps;

function BaseDialog ({ children, className, onClose, title, width }) {
    const containerClassName = classnames(
        styles.container,
        styles[`${width}Width`],
        className
    );

    // Add back button

    const dialogElement = (
        <div
            className={styles.root}
            onClick={onClose}
        >
            <div
                className={containerClassName}
                onClick={event => event.stopPropagation()}
            >
                <CloseIconButton
                    className={styles.closeIconButton}
                    onClick={onClose}
                />

                {title && <div className={styles.title}>
                    {title}
                </div>}

                <div className={styles.content}>
                    {children}
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
        document.body
    );
}

export default memo(BaseDialog);
