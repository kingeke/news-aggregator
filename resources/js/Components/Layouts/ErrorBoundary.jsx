import ErrorHandler from '@/Pages/ErrorHandler';
import React, { Component, Fragment } from 'react';

class ErrorBoundary extends Component {

    state = {
        hasError: false,
        errorMessage: ''
    };

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            errorMessage: error?.message
        });
    }

    render() {

        const { hasError, errorMessage } = this.state;
        const { children } = this.props;

        return (
            <Fragment>
                {
                    hasError ?
                        <ErrorHandler status={900} errorMessage={errorMessage} />
                        : children
                }
            </Fragment>
        );
    }
}

export default ErrorBoundary;