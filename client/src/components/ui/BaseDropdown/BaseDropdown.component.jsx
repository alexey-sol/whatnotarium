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
    elemRef,
    isFixed,
    onClose,
    rootClassName
}) {
    const [coords, setCoords] = useState(INITIAL_COORDS);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeydown);
        return () => document.removeEventListener("keydown", handleKeydown);
    }, [onClose]);

    const { x, y } = coords;

    const positionStyle = {
        left: x,
        top: y
    };

    const isProperlyPositioned = Boolean(x && y);

    const dropdownClassName = classnames(
        styles.container,
        rootClassName,
        (isProperlyPositioned) ? "" : styles.transparent,
        (isFixed) ? styles.fixed : ""
    );

    const dropdownElem = (
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
    }, [onClose]);

    useEffect(() => {
        const elem = elemRef.current;
        const dropdown = dropdownRef.current;

        if (elem && dropdown) {
            const newCoords = getPopupCoords(elem, dropdown);
            setCoords(newCoords);
        }
    }, [elemRef, dropdownRef]);

    return ReactDOM.createPortal(
        dropdownElem,
        elemRef.current
    );
}

export default BaseDropdown;
