import React, { memo, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";

import { CloseIconButton } from "components/common/IconButton";
import { defaultProps, propTypes } from "./BaseDialog.props";
import styles from "./BaseDialog.module.scss";

BaseDialog.propTypes = propTypes;
BaseDialog.defaultProps = defaultProps;

function BaseDialog ({ children, className, onClose, title, width }) {
    const rootRef = useRef(null);

    const containerClassName = classnames(
        styles.container,
        styles[`${width}Width`],
        className
    );

    const handleMouseDownOnRoot = (event) => {
        const targetIsRoot = event.target === rootRef.current;
        if (targetIsRoot) onClose();
    };

    // TODO: add back button

    const dialogElement = (
        <div
            className={styles.root}
            onMouseDown={handleMouseDownOnRoot}
            ref={rootRef}
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
