import React, { Component } from "react";

import { defaultProps, propTypes } from "./ErrorBoundary.props";
import styles from "./ErrorBoundary.module.scss";

class ErrorBoundary extends Component {
    static defaultProps = defaultProps
    static propTypes = propTypes

    static getDerivedStateFromError (error) {
        return { error };
    }

    constructor (props) {
        super(props);
        this.state = {
            error: null
        };
    }

    componentDidCatch (error) {
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
            : children;
    }
}

export default ErrorBoundary;
