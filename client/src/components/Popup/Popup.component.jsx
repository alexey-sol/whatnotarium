import React from "react";
import ReactDOM from "react-dom";

import { CloseIconButton } from "components/IconButton";
import { defaultProps, propTypes } from "./Popup.props";
import classnames from "classnames";
import styles from "./Popup.module.scss";

Popup.defaultProps = defaultProps;
Popup.propTypes = propTypes;

function Popup ({ onClose, text, theme }) {
    const popupClassName = classnames(
        styles.container,
        styles[`${theme}Theme`]
    );

    const tooltipElement = (
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
        tooltipElement,
        document.body
    );
}

export default Popup;
