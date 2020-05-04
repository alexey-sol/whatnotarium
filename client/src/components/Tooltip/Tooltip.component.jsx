import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { defaultProps, propTypes } from "./Tooltip.props";
import classnames from "classnames";
import getPopupCoords from "utils/helpers/getPopupCoords";
import styles from "./Tooltip.module.scss";

Tooltip.defaultProps = defaultProps;
Tooltip.propTypes = propTypes;

const INITIAL_COORDS = {
    x: 0,
    y: 0
};

const tooltipWidthsInPx = {
    small: 60,
    medium: 120,
    large: 180
};

function Tooltip ({
    elementRef,
    isFixed,
    text,
    width
}) {
    const [coords, setCoords] = useState(INITIAL_COORDS);
    const [tooltipIsShown, setTooltipIsShown] = useState(false);

    const tooltipWidth = tooltipWidthsInPx[width];
    const { x, y } = coords;

    const positionStyle = {
        left: x,
        top: y
    };

    const tooltipClassName = classnames(
        styles.container,
        styles[`${width}Width`],
        (isFixed) ? styles.fixed : ""
    );

    const tooltipElement = (
        <div
            className={tooltipClassName}
            style={positionStyle}
        >
            <span className={styles.text}>
                {text}
            </span>
        </div>
    );

    useEffect(() => {
        const element = elementRef.current;

        if (element) {
            const newCoords = getPopupCoords(element, null, {
                popupWidth: tooltipWidth
            });

            setCoords(newCoords);
        }
    }, [elementRef, tooltipWidth]);

    useEffect(() => {
        const element = elementRef.current;
        const tooltipHasCoords = Boolean(x && y);

        if (element && tooltipHasCoords) {
            const showTooltip = () => setTooltipIsShown(true);
            const hideTooltip = () => setTooltipIsShown(false);

            element.addEventListener("mouseenter", showTooltip);
            element.addEventListener("mouseleave", hideTooltip);

            return () => {
                element.removeEventListener("mouseenter", showTooltip);
                element.removeEventListener("mouseleave", hideTooltip);
            };
        }
    }, [elementRef, x, y]);

    const portal = ReactDOM.createPortal(
        tooltipElement,
        document.body
    );

    return (tooltipIsShown)
        ? portal
        : null;
}

export default Tooltip;
