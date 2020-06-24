import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { CloseIconButton } from "components/IconButton";
import { defaultProps, propTypes } from "./Popup.props";
import classnames from "classnames";
import styles from "./Popup.module.scss";

Popup.defaultProps = defaultProps;
Popup.propTypes = propTypes;

function Popup ({ onClose, text, theme }) {
    // TODO: add custom timeout
    const timeoutInMs = 3000;
    const timerRef = useRef(null);

    const popupClassName = classnames(
        styles.container,
        styles[`${theme}Theme`]
    );

    useEffect(() => {
        timerRef.current = setTimeout(onClose, timeoutInMs);

        const onKeydown = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKeydown);
        return () => document.removeEventListener("keydown", onKeydown);
    }, [onClose]);

    const tooltipElem = (
        <div className={popupClassName}>
            <span className={styles.text}>
                {text}
            </span>

            <CloseIconButton
                className={styles.closeIconButton}
                onClick={onClose}
                size={12}
                theme="dark"
            />
        </div>
    );

    return ReactDOM.createPortal(
        tooltipElem,
        document.body
    );
}

export default Popup;
