import React from "react";
import classnames from "classnames";

import { defaultProps, propTypes } from "./NavbarTab.props";
import styles from "./NavbarTab.module.scss";

NavbarTab.defaultProps = defaultProps;
NavbarTab.propTypes = propTypes;

function NavbarTab ({ children, className, isActive }) {
    const containerClassName = classnames(
        styles.container,
        (isActive) ? styles.active : "",
        className
    );

    return (
        <li className={containerClassName}>
            {children}
        </li>
    );
}
export default NavbarTab;
