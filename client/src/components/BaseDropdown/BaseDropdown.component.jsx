import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import { defaultProps, propTypes } from "./BaseDropdown.props";
import classnames from "classnames";
import getPopupCoords from "utils/helpers/getPopupCoords";
import styles from "./BaseDropdown.module.scss";

BaseDropdown.defaultProps = defaultProps;
BaseDropdown.propTypes = propTypes;

const INITIAL_COORDS = {
    x: 0,
    y: 0
};

function BaseDropdown ({
    children,
    className,
    elementRef,
    isFixed,
    onClose
}) {
    const [coords, setCoords] = useState(INITIAL_COORDS);
    const dropdownRef = useRef(null);

    const { x, y } = coords;

    const positionStyle = {
        left: x,
        top: y
    };

    const isProperlyPositioned = Boolean(x && y);

    const dropdownClassName = classnames(
        styles.container,
        className,
        (isProperlyPositioned) ? "" : styles.transparent,
        (isFixed) ? styles.fixed : ""
    );

    const dropdownElement = (
        <div
            className={dropdownClassName}
            ref={dropdownRef}
            style={positionStyle}
        >
            {children}
        </div>
    );

    useEffect(() => {
        const dropdown = dropdownRef.current;

        if (dropdown) {
            const hideDropdown = ({ target }) => {
                const isClickOutside = !dropdown.contains(target);

                if (isClickOutside) {
                    onClose();
                }
            };

            document.addEventListener("click", hideDropdown);
            return () => document.removeEventListener("click", hideDropdown);
        }
    }, [dropdownRef, onClose]);

    useEffect(() => {
        const element = elementRef.current;
        const dropdown = dropdownRef.current;

        if (element && dropdown) {
            const newCoords = getPopupCoords(element, dropdown);
            setCoords(newCoords);
        }
    }, [elementRef, dropdownRef]);

    return ReactDOM.createPortal(
        dropdownElement,
        document.body
    );
}

export default BaseDropdown;
