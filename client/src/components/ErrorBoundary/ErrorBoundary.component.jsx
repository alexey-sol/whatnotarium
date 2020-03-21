import React, { Component } from "react";

import { defaultProps, propTypes } from "./ErrorBoundary.props";
import styles from "./ErrorBoundary.module.scss";

class ErrorBoundary extends Component {
    static defaultProps = defaultProps
    static propTypes = propTypes

    state = {
        error: null
    }

    static getDerivedStateFromError (error) {
        return { error };
    }

    componentDidCatch (error, info) {
        console.error(error);
    }

    renderErrorMessage () {
        return (
            <div className={styles.container}>
                Простите, на странице что-то поломалось.
            </div>
        );
    }

    render () {
        const { error } = this.state;
        const { children } = this.props;

        return (error)
            ? this.renderErrorMessage()
            : children
        ;
    }
}

export default ErrorBoundary;
